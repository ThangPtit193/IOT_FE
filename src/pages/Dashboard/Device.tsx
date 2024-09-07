import React, { useState, useEffect, CSSProperties } from 'react';
import { FaFan, FaTv, FaLightbulb, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import mqtt, { MqttClient } from 'mqtt';

const Device = () => {

  const [client, setClient] = useState<MqttClient | null>(null);
  const [fanOn, setFanOn] = useState<boolean>(false);
  const [tvOn, setTvOn] = useState<boolean>(false);
  const [bulbOn, setBulbOn] = useState<boolean>(false);  // Corrected variable name to bulbOn
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({ fan: false, tv: false, bulb: false });

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

  }, []);

  const toggleDevice = (device: string, state: boolean) => {
    if (client) {
      switch (device) {
        case 'fan':
          setFanOn(!state);
          break;
        case 'tv':
          setTvOn(!state);
          break;
        case 'bulb':  // Fixed the case name
          setBulbOn(!state);
          break;
      }
      client.publish(`esp8266/${device}`, JSON.stringify({ state: !state }));
      console.log("Dữ liệu đã được gửi thành công");
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

  const fanStyle: CSSProperties = {
    animation: fanOn ? 'spin 2s linear infinite' : 'none',
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
