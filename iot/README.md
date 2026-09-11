# SmartClean IoT & Hardware Integration Layer

This module provides the IoT Telemetry Simulator and the physical ESP32 Smart Bin firmware for the SmartClean platform.

## 📡 1. Telemetry Simulator (`simulator/telemetry_simulator.py`)

The simulator emulates 15 physical smart bins located across Hyderabad municipal zones, periodically publishing MQTT telemetry payloads to Mosquitto.

### Requirements
- Python 3.10+
- `paho-mqtt` library

### Running the Simulator
```bash
cd iot/simulator
python3 telemetry_simulator.py
```

### Environment Variables
- `MQTT_BROKER`: Broker hostname or IP (default: `localhost`)
- `MQTT_PORT`: Broker port (default: `1883`)

---

## ⚡ 2. Physical Firmware (`firmware/smart_bin_esp32.ino`)

Executable C++ / Arduino sketch for flashing ESP32-WROOM-32 microcontrollers attached to physical segregation bins.

### Pin Wiring Diagram
| Component | ESP32 Pin | Notes |
| :--- | :--- | :--- |
| **HC-SR04 Trigger** | GPIO 5 | Ultrasonic Distance Measurement |
| **HC-SR04 Echo** | GPIO 18 | Ultrasonic Echo Pulse |
| **DHT11 Data** | GPIO 4 | Temperature & Humidity Sensor |
| **Servo Data** | GPIO 13 | Flap Compartment Motor (WET / DRY / REJECT) |

### Libraries Required in Arduino IDE
- `PubSubClient` (by Nick O'Leary)
- `ESP32Servo` (by Kevin Harrington)
- `DHT sensor library` (by Adafruit)
- `ArduinoJson` (by Benoit Blanchon)
