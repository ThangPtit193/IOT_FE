import React, { useState, useEffect, CSSProperties } from 'react';
import { FaFan, FaTv, FaLightbulb, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import mqtt, { MqttClient } from 'mqtt';
import { saveHistoryToDatabase } from '../../data/repositories/api';

export interface DeviceSchema {
  _id: string;
  name: string;
  action?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HistorySchema {
  deviceId: string;
  deviceName: string;
  action: boolean;
}

const Device = ({ devices }: { devices: DeviceSchema[] }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [deviceStates, setDeviceStates] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const host = '667e33c453fe4f028d4486b0f821713b.s1.eu.hivemq.cloud';
    const port = 8884;
    const clientId = `mqttjs_${Math.random().toString(16).substr(2, 8)}`;
    const connectUrl = `wss://${host}:${port}/mqtt`;

    const options = {
      clientId,
      username: 'songcuon123',
      password: 'songcuon123',
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    };

    const mqttClient = mqtt.connect(connectUrl, options);
    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('Device component connected to MQTT broker');
    });

    // return () => {
    //   mqttClient.end(); // Clean up on unmount
    // };

  }, []);

  useEffect(() => {
    // Initialize device states based on the devices received from the API
    const initialStates: { [key: string]: boolean } = {};
    devices.forEach(device => {
      initialStates[device._id] = device.action || false; // Default to false if action is undefined
      setLoading(prev => ({ ...prev, [device._id]: false })); // Initialize loading state
    });
    setDeviceStates(initialStates);
  }, [devices]);

  const toggleDevice = async (deviceId: string, deviceName: string) => {

    if (client) {
      const currentState = deviceStates[deviceId];
      const newState = !currentState;

      setDeviceStates(prev => ({ ...prev, [deviceId]: newState }));
      setLoading(prev => ({ ...prev, [deviceId]: true }));

      client.publish(`esp8266/${deviceName}`, JSON.stringify({ state: newState }));
      console.log(deviceName, newState)


      try {
        const response = await fetch(`http://localhost:3001/api/data/update-device/${deviceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Thêm header này
          },
          body: JSON.stringify({ action: newState }),
        });

        if (!response.ok) {
          throw new Error('Failed to update device action');

        }

        const result = await response.json();
        console.log('Device updated:', result.data);
        const historyEntry = {
          deviceId: deviceId,
          deviceName: deviceName,
          action: newState,
        };
        await saveHistoryToDatabase(historyEntry);

      } catch (error) {
        console.error('Error updating device action:', error);
      } finally {
        setLoading(prev => ({ ...prev, [deviceId]: false }));
      }

    }
  };

  const getContainerStyle = (isOn: boolean): CSSProperties => ({
    width: '350px',
    height: '240px',
    backgroundColor: isOn ? '#C3DBFF' : '#FFFFFF',
    marginLeft: '20px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  });

  const iconStyle: CSSProperties = {
    fontSize: '80px',
  };

  const buttonStyle: CSSProperties = {
    fontSize: '40px',
    cursor: 'pointer',
    position: 'relative',
  };

  return (
    <div className='row d-flex justify-content-center' style={{ gap: '20px' }}>
      {/* Fan */}
      <div style={getContainerStyle(fanOn)}>
        <h4 style={{ color: '#284680' }}>Quạt</h4>
        <div style={{ width: '100px', height: '100px', backgroundColor: '#3E7EF7', borderRadius: '16px' }} className='d-flex justify-content-center align-items-center'>
          <FaFan style={{ ...iconStyle, ...fanStyle, color: '#fff' }} />
        </div>
        <div
          onClick={() => toggleDevice('fan', fanOn)}
          style={{ ...buttonStyle, color: fanOn ? '#fff' : '#6c757d' }}
        >
          {loading.fan ? <div className="spinner"></div> : (fanOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>

      {/* TV */}
      <div style={getContainerStyle(tvOn)}>
        <h4 style={{ color: '#284680' }}>Tivi</h4>
        <div style={{ width: '100px', height: '100px', backgroundColor: '#3E7EF7', borderRadius: '16px' }} className='d-flex justify-content-center align-items-center'>
          <FaTv style={{ ...iconStyle, color: '#fff' }} />
        </div>
        <div
          onClick={() => toggleDevice('tv', tvOn)}
          style={{ ...buttonStyle, color: tvOn ? '#fff' : '#6c757d' }}
        >
          {loading.tv ? <div className="spinner"></div> : (tvOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>

      {/* Light Bulb */}
      <div style={getContainerStyle(bulbOn)}>  {/* Updated the style reference */}
        <h4 style={{ color: '#284680' }}>Bóng đèn</h4>
        <div style={{ width: '100px', height: '100px', backgroundColor: '#3E7EF7', borderRadius: '16px' }} className='d-flex justify-content-center align-items-center'>
          <FaLightbulb style={{ ...iconStyle, color: '#fff' }} />
        </div>
        <div
          onClick={() => toggleDevice('bulb', bulbOn)}
          style={{ ...buttonStyle, color: bulbOn ? '#fff' : '#6c757d' }}
        >
          {loading.bulb ? <div className="spinner"></div> : (bulbOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>
    </div>
  );
};

export default Device;
