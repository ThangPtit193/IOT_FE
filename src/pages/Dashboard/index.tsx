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


    initializeMqttClient((newData) => {
      setMqttData(newData);
      setDataSensor((prevData) => [...prevData, newData]);
    });

    getDevices();


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
      <div className='d-md-flex justify-content-between'>
        <Chart dataSensor={dataSensor} />
        <Device devices={devices} />
      </div>
    </div>
  );
};

export default Dashboard;