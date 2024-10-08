// mqttService.ts
import mqtt from 'mqtt';
import { sendDataToDatabase } from '../api';

const host = '667e33c453fe4f028d4486b0f821713b.s1.eu.hivemq.cloud';
const port = 8884;
const clientId = `mqttjs_${Math.random().toString(16).substr(2, 8)}`;
const connectUrl = `wss://${host}:${port}/mqtt`;
const topicSensor = "Data_Sensor";
const topicLight = "Light";

const options = {
  clientId,
  username: 'songcuon123',
  password: 'songcuon123',
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
};

export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  light: number | null;
}

export const initializeMqttClient = (onDataReceived: (data: SensorData) => void) => {
  const client = mqtt.connect(connectUrl, options);
  let data: SensorData = {
    temperature: null,
    humidity: null,
    light: null,
  };

  client.on('connect', function () {
    client.subscribe([topicSensor, topicLight]);
  });

  client.on('message', async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      console.log("payload", payload);
      if (topic === topicSensor) {
        data.humidity = payload.humidity;
        data.temperature = payload.temperature;
      } else if (topic === topicLight) {
        data.light = payload.lux;
      }

      if (data.temperature !== null && data.humidity !== null && data.light !== null) {
        onDataReceived({ ...data });
        try {
          await sendDataToDatabase({ ...data });
          console.log('Data sent to database successfully');
        } catch (error) {
          console.error('Failed to send data to database:', error);
        }
        data = {
          temperature: null,
          humidity: null,
          light: null
        };
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  return client;
};