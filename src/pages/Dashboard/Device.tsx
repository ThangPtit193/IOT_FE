import React, { useState, CSSProperties } from 'react';
import { FaFan, FaTv, FaLightbulb, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Device = () => {
  const [fanOn, setFanOn] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [loading, setLoading] = useState({ fan: false, tv: false, light: false });

  const toggleDevice = (device: 'fan' | 'tv' | 'light') => {
    setLoading({ ...loading, [device]: true });

    setTimeout(() => {
      switch (device) {
        case 'fan':
          setFanOn(!fanOn);
          break;
        case 'tv':
          setTvOn(!tvOn);
          break;
        case 'light':
          setLightOn(!lightOn);
          break;
      }
      setLoading({ ...loading, [device]: false });
    }, 3000); // Đợi 3 giây trước khi chuyển trạng thái
  };

  const getContainerStyle = (isOn: boolean): CSSProperties => ({
    width: '300px',
    height: '300px',
    backgroundColor: isOn ? '#00DD00' : '#DDDDDD', // Xanh lam nhạt khi bật, đỏ nhạt khi tắt
    marginLeft: '20px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
  });

  const iconStyle: CSSProperties = {
    fontSize: '80px',
    marginBottom: '20px',
  };

  const buttonStyle: CSSProperties = {
    fontSize: '40px',
    cursor: 'pointer',
    position: 'relative',
  };

  const fanStyle: CSSProperties = {
    animation: fanOn ? 'spin 2s linear infinite' : 'none',
  };

  const tvStyle: CSSProperties = {
    color: tvOn ? '#000' : '#6c757d', // Đen khi bật, xám khi tắt
    textShadow: tvOn ? '0 0 15px rgba(0, 0, 0, 0.7)' : 'none', // Ánh sáng khi bật
  };

  const lightStyle: CSSProperties = {
    color: lightOn ? '#fefefe' : '#6c757d', // Trắng khi bật, xám khi tắt
    textShadow: lightOn ? '0 0 20px #ffff00' : 'none', // Ánh sáng vàng khi bật
  };

  return (
    <div className='row d-flex justify-content-center' style={{ gap: '20px' }}>
      
      {/* Quạt */}
      <div style={getContainerStyle(fanOn)}>
        <h4>Quạt</h4>
        <FaFan style={{ ...iconStyle, ...fanStyle, color: fanOn ? '#fff' : '#6c757d' }} />
        <div
          onClick={() => !loading.fan && toggleDevice('fan')}
          style={{ ...buttonStyle, color: fanOn ? '#fff' : '#6c757d' }}
        >
          {loading.fan ? <div className="spinner"></div> : (fanOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>
      
      {/* Tivi */}
      <div style={getContainerStyle(tvOn)}>
        <h4>Tivi</h4>
        <FaTv style={{ ...iconStyle, ...tvStyle }} />
        <div
          onClick={() => !loading.tv && toggleDevice('tv')}
          style={{ ...buttonStyle, color: tvOn ? '#fff' : '#6c757d' }}
        >
          {loading.tv ? <div className="spinner"></div> : (tvOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>
      
      {/* Bóng đèn */}
      <div style={getContainerStyle(lightOn)}>
        <h4>Bóng đèn</h4>
        <FaLightbulb style={{ ...iconStyle, ...lightStyle }} />
        <div
          onClick={() => !loading.light && toggleDevice('light')}
          style={{ ...buttonStyle, color: lightOn ? '#fff' : '#6c757d' }}
        >
          {loading.light ? <div className="spinner"></div> : (lightOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>

    </div>
  );
};

export default Device;
