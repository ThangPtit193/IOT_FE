import React, { useState, useEffect } from 'react';
import Overview from './Overview';
import Chart from './Chart';
import Device from './Device';
import mqtt from 'mqtt';

const host = '667e33c453fe4f028d4486b0f821713b.s1.eu.hivemq.cloud'; // ví dụ: 1234abcd.s2.eu.hivemq.cloud
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

interface SensorData {
  temperature: number | null;
  humidity: number | null;
  light: number | null;
}

// Initialize data with the correct structure
let data: SensorData = {
  temperature: null,
  humidity: null,
  light: null,
};

const Dashboard = () => {

  const [mqttData, setMqttData] = React.useState<SensorData>({
    temperature: null,
    humidity: null,
    light: null
  })

  const [dataSensor, setDataSensor] = useState<SensorData[]>([]);


  useEffect(() => {
    const client = mqtt.connect(connectUrl, options);
    client.on('connect', function () {
      // Subscribe to topics
      client.subscribe([topicSensor, topicLight]);
    });

    client.on('message', async (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        if (topic === topicSensor) {
          // Update data with sensor information
          data.humidity = payload.humidity;
          data.temperature = payload.temperature;

        } else if (topic === topicLight) {
          data.light = payload.percent;
        }

        // Reset data if all values are received
        if (data.temperature !== null && data.humidity !== null && data.light !== null) {
          setMqttData({
            temperature: data.temperature,
            humidity: data.humidity,
            light: data.light,
          });
          const newDataEntry = {
            temperature: data.temperature,
            humidity: data.humidity,
            light: data.light
          };

          setDataSensor((prevData) => [...prevData, newDataEntry]);
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

  }, []);

  return (
    <div>
      <Overview mqttData={mqttData} />
      <div className='d-md-flex'>
        <Chart dataSensor={dataSensor} />
        <Device />
      </div>
    </div>
  );
};

export default Dashboard;
