// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Overview from './Overview';
import Chart from './Chart';
import Device, { DeviceSchema } from './Device';
import { initializeMqttClient, SensorData } from '../../data/repositories/mqtt';

const Dashboard = () => {

  const [mqttData, setMqttData] = useState<SensorData>({
    temperature: null,
    humidity: null,
    light: null
  });

  const [dataSensor, setDataSensor] = useState<SensorData[]>([]);

  const [devices, setDevices] = useState<DeviceSchema[]>([])

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

  const getDevices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data/get-device');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Hiển thị dữ liệu nhận được
      setDevices(data.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

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