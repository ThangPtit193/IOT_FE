import React, { useState, useEffect, useCallback } from 'react';
import Overview from './Overview';
import Chart from './Chart';
import Device, { DeviceSchema } from './Device';
import { initializeMqttClient, SensorData } from '../../data/repositories/mqtt';

const Dashboard = () => {
  const [mqttData, setMqttData] = useState<SensorData>({ temperature: null, humidity: null, light: null, fog: null });
  const [dataSensor, setDataSensor] = useState<SensorData[]>([]);
  const [devices, setDevices] = useState<DeviceSchema[]>([]);

  const initializeClient = useCallback(() => {
    const client = initializeMqttClient((newData) => {
      setMqttData(newData);
      setDataSensor((prevData) => [...prevData, newData]);
    });
    return client; // Giữ lại client để sử dụng trong destructor
  }, []);

  useEffect(() => {
    const client = initializeClient(); // Khởi tạo client
    getDevices();

    return () => {
      client.end(); // Kết thúc client khi component unmount
    };
  }, [initializeClient]); // Chỉ chạy lại effect khi initializeClient thay đổi

  const getDevices = useCallback(async () => {
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
  }, []); // Không có dependencies nên chỉ chạy một lần khi mount

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
