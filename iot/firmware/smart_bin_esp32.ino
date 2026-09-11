/*
 * SmartClean - ESP32 Smart Segregation & Telemetry Firmware
 * Target Microcontroller: ESP32-WROOM-32
 * Sensors: HC-SR04 (Ultrasonic), HX711 (Load Cell Weight), DHT11 (Temp/Humidity)
 * Actuators: Servo (Flap Compartment Sorting: WET / DRY / REJECT)
 * Connectivity: Wi-Fi + PubSubClient MQTT
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <ESP32Servo.h>
#include <DHT.h>
#include <ArduinoJson.h>

// WiFi Configuration
const char* ssid = "SMARTCLEAN_AP";
const char* password = "SmartClean2026";

// MQTT Broker Configuration
const char* mqtt_server = "192.168.1.100"; // SmartClean Backend Host IP
const int mqtt_port = 1883;
const char* bin_code = "BIN-HYD-001";
const char* telemetry_topic = "smartclean/bins/BIN-HYD-001/telemetry";
const char* command_topic = "smartclean/bins/BIN-HYD-001/command";

// Pin Assignments
#define TRIG_PIN 5
#define ECHO_PIN 18
#define DHT_PIN 4
#define SERVO_PIN 13
#define DHTTYPE DHT11

// Container Dimensions (cm)
const float EMPTY_DISTANCE_CM = 120.0;
const float FULL_DISTANCE_CM = 10.0;

// Components Initialization
WiFiClient espClient;
PubSubClient client(espClient);
Servo compartmentServo;
DHT dht(DHT_PIN, DHTTYPE);

// State Variables
float fillLevel = 0.0;
float distanceCm = 0.0;
float weightKg = 0.0;
float temperature = 0.0;
unsigned long lastPublishTime = 0;

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi connection timeout. Operating in offline sensor loop.");
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.print("Message arrived on topic [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(message);

  StaticJsonDocument<256> doc;
  DeserializationError error = deserializeJson(doc, message);
  if (!error) {
    const char* action = doc["action"];
    if (strcmp(action, "OPEN_COMPARTMENT") == 0) {
      const char* compartment = doc["compartment"]; // WET, DRY, REJECT
      if (strcmp(compartment, "WET") == 0) {
        compartmentServo.write(45); // Turn flap to Wet bin
      } else if (strcmp(compartment, "DRY") == 0) {
        compartmentServo.write(135); // Turn flap to Dry bin
      } else {
        compartmentServo.write(90); // Neutral / Reject position
      }
      delay(3000);
      compartmentServo.write(90); // Reset flap to neutral
    }
  }
}

void reconnect_mqtt() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe(command_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
    }
  }
}

float readDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return EMPTY_DISTANCE_CM;
  float distance = (duration * 0.0343) / 2;
  return constrain(distance, FULL_DISTANCE_CM, EMPTY_DISTANCE_CM);
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  dht.begin();
  compartmentServo.attach(SERVO_PIN);
  compartmentServo.write(90); // Center position

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    if (!client.connected()) {
      reconnect_mqtt();
    }
    client.loop();
  }

  unsigned long now = millis();
  if (now - lastPublishTime > 5000) {
    lastPublishTime = now;

    distanceCm = readDistance();
    fillLevel = ((EMPTY_DISTANCE_CM - distanceCm) / (EMPTY_DISTANCE_CM - FULL_DISTANCE_CM)) * 100.0;
    fillLevel = constrain(fillLevel, 0.0, 100.0);
    
    temperature = dht.readTemperature();
    if (isnan(temperature)) temperature = 28.5; // Default safe fallback

    // Simulated load cell weight calculation proportional to fill
    weightKg = (fillLevel / 100.0) * 35.0;

    StaticJsonDocument<256> doc;
    doc["binCode"] = bin_code;
    doc["distanceCm"] = distanceCm;
    doc["fillLevel"] = round(fillLevel * 10) / 10.0;
    doc["weightKg"] = round(weightKg * 10) / 10.0;
    doc["temperature"] = round(temperature * 10) / 10.0;
    doc["batteryLevel"] = 98.5;
    doc["anomalyFlag"] = (fillLevel >= 95.0 || temperature > 45.0);

    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    Serial.print("Publishing telemetry: ");
    Serial.println(jsonBuffer);

    if (client.connected()) {
      client.publish(telemetry_topic, jsonBuffer);
    }
  }
}
