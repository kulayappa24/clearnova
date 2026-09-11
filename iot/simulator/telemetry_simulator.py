#!/usr/bin/env python3
"""
SmartClean IoT Telemetry Simulator
Simulates 15 smart bins publishing MQTT telemetry payloads to Mosquitto MQTT Broker.
"""

import json
import logging
import math
import os
import random
import sys
import time
from datetime import datetime

try:
    import paho.mqtt.client as mqtt
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "paho-mqtt"])
    import paho.mqtt.client as mqtt

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("SmartClean-IoT-Simulator")

MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_TOPIC_PREFIX = "smartclean/bins"

# 15 Bins across Hyderabad Zones
BINS = [
    {"bin_code": "BIN-HYD-001", "name": "Banjara Hills Road #12", "zone": "Zone 1 - West", "empty_cm": 120.0, "full_cm": 10.0, "fill": 82.5, "weight": 28.4, "temp": 31.2, "battery": 94.0},
    {"bin_code": "BIN-HYD-002", "name": "Jubilee Hills Checkpost", "zone": "Zone 1 - West", "empty_cm": 120.0, "full_cm": 10.0, "fill": 91.0, "weight": 34.1, "temp": 32.5, "battery": 88.0},
    {"bin_code": "BIN-HYD-003", "name": "HITECH City Cyber Towers", "zone": "Zone 1 - West", "empty_cm": 150.0, "full_cm": 15.0, "fill": 74.0, "weight": 42.0, "temp": 30.8, "battery": 96.0},
    {"bin_code": "BIN-HYD-004", "name": "Gachibowli DLF IT Park", "zone": "Zone 1 - West", "empty_cm": 150.0, "full_cm": 15.0, "fill": 65.0, "weight": 21.5, "temp": 29.5, "battery": 92.0},
    {"bin_code": "BIN-HYD-005", "name": "Madhapur Mindspace", "zone": "Zone 1 - West", "empty_cm": 120.0, "full_cm": 10.0, "fill": 88.0, "weight": 31.0, "temp": 33.1, "battery": 78.0},
    {"bin_code": "BIN-HYD-006", "name": "Kondapur Botanical Garden", "zone": "Zone 1 - West", "empty_cm": 100.0, "full_cm": 10.0, "fill": 45.0, "weight": 14.2, "temp": 28.4, "battery": 99.0},
    {"bin_code": "BIN-HYD-007", "name": "Charminar Monument North", "zone": "Zone 2 - South", "empty_cm": 120.0, "full_cm": 10.0, "fill": 96.5, "weight": 48.2, "temp": 35.4, "battery": 81.0},
    {"bin_code": "BIN-HYD-008", "name": "Koti Women's College", "zone": "Zone 2 - South", "empty_cm": 100.0, "full_cm": 10.0, "fill": 52.0, "weight": 18.0, "temp": 30.1, "battery": 95.0},
    {"bin_code": "BIN-HYD-009", "name": "Abids Commercial Complex", "zone": "Zone 2 - South", "empty_cm": 120.0, "full_cm": 10.0, "fill": 68.0, "weight": 24.8, "temp": 31.0, "battery": 87.0},
    {"bin_code": "BIN-HYD-010", "name": "Begumpet Airport Plaza", "zone": "Zone 3 - North", "empty_cm": 120.0, "full_cm": 10.0, "fill": 38.0, "weight": 11.5, "temp": 29.0, "battery": 100.0},
    {"bin_code": "BIN-HYD-011", "name": "Secunderabad Railway Station", "zone": "Zone 3 - North", "empty_cm": 150.0, "full_cm": 15.0, "fill": 93.0, "weight": 52.4, "temp": 34.0, "battery": 73.0},
    {"bin_code": "BIN-HYD-012", "name": "Ameerpet Metro Station", "zone": "Zone 3 - North", "empty_cm": 120.0, "full_cm": 10.0, "fill": 81.0, "weight": 29.6, "temp": 32.0, "battery": 90.0},
    {"bin_code": "BIN-HYD-013", "name": "Kukatpally Housing Board", "zone": "Zone 4 - Central", "empty_cm": 120.0, "full_cm": 10.0, "fill": 58.0, "weight": 20.1, "temp": 30.5, "battery": 91.0},
    {"bin_code": "BIN-HYD-014", "name": "Dilsukhnagar Bus Depot", "zone": "Zone 4 - Central", "empty_cm": 150.0, "full_cm": 15.0, "fill": 79.0, "weight": 38.0, "temp": 33.8, "battery": 84.0},
    {"bin_code": "BIN-HYD-015", "name": "LB Nagar Ring Road", "zone": "Zone 4 - Central", "empty_cm": 120.0, "full_cm": 10.0, "fill": 41.0, "weight": 15.3, "temp": 28.9, "battery": 97.0},
]

def calculate_distance(bin_data):
    fill = bin_data["fill"]
    empty_cm = bin_data["empty_cm"]
    full_cm = bin_data["full_cm"]
    distance = empty_cm - ((fill / 100.0) * (empty_cm - full_cm))
    return round(max(full_cm, min(empty_cm, distance)), 1)

def on_connect(client, userdata, flags, rc, properties=None):
    if rc == 0:
        logger.info(f"Connected to MQTT Broker at {MQTT_BROKER}:{MQTT_PORT}")
    else:
        logger.error(f"Failed to connect to MQTT Broker, return code {rc}")

def run_simulator():
    client = mqtt.Client(client_id="smartclean-iot-simulator-daemon")
    client.on_connect = on_connect

    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.loop_start()
    except Exception as e:
        logger.warning(f"Could not connect to live MQTT broker ({e}). Simulation running in dry-run log mode.")
        client = None

    logger.info("Starting SmartClean IoT Telemetry Loop (publishing every 5 seconds)...")

    step = 0
    try:
        while True:
            step += 1
            for b in BINS:
                fill_increment = random.uniform(0.1, 0.6)
                if b["fill"] > 98.0:
                    fill_increment = 0.0
                b["fill"] = min(100.0, b["fill"] + fill_increment)
                b["weight"] += round(fill_increment * random.uniform(0.2, 0.5), 2)
                b["temp"] = round(30.0 + 4.0 * math.sin(step * 0.1) + random.uniform(-0.5, 0.5), 1)
                b["battery"] = max(10.0, b["battery"] - 0.01)

                distance_cm = calculate_distance(b)

                payload = {
                    "binCode": b["bin_code"],
                    "distanceCm": distance_cm,
                    "fillLevel": round(b["fill"], 1),
                    "weightKg": round(b["weight"], 1),
                    "temperature": b["temp"],
                    "batteryLevel": round(b["battery"], 1),
                    "anomalyFlag": b["temp"] > 45.0 or b["fill"] >= 95.0,
                    "timestamp": datetime.utcnow().isoformat() + "Z"
                }

                topic = f"{MQTT_TOPIC_PREFIX}/{b['bin_code']}/telemetry"

                if client and client.is_connected():
                    client.publish(topic, json.dumps(payload), qos=1)
                    logger.info(f"Published telemetry to {topic}: fill={payload['fillLevel']}%, dist={payload['distanceCm']}cm, weight={payload['weightKg']}kg")
                else:
                    logger.info(f"[DRY-RUN] {topic}: {payload}")

            time.sleep(5)
    except KeyboardInterrupt:
        logger.info("Stopping IoT Telemetry Simulator.")
        if client:
            client.loop_stop()
            client.disconnect()

if __name__ == "__main__":
    run_simulator()
