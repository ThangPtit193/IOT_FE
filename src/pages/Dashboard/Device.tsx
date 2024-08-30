import React, { useState, CSSProperties } from 'react';
import { FaFan, FaTv, FaLightbulb, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { baseUrl } from '../../const';
import { DEVICE_STATE_PATH } from '../../const/path';

const Device = () => {
  const [fanOn, setFanOn] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState({ fan: false, tv: false, light: false });

  const toggleFan = async () => {
    setFanOn(!fanOn);

    const req = {
      action: fanOn
    }

    let fetchOption: any = {
      method: "PUT",
      body: JSON.stringify(req),
    }
    try {
      const response = await fetch(baseUrl + DEVICE_STATE_PATH , fetchOption);
      const responseData = await response.json();
      // console.log('responseData', responseData)
    } catch (err: any) { }
  }

  const toggleTv = () => {
    setTvOn(!tvOn)
  }

  const toggleLight = () => {
    setLightOn(!lightOn)
  }

  const getContainerStyle = (isOn: boolean): CSSProperties => ({
    width: '350px',
    height: '240px',
    backgroundColor: isOn ? '#C3DBFF' : '#FFFFFF', // Xanh lam nhạt khi bật, đỏ nhạt khi tắt
    marginLeft: '20px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid #ccc',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Sửa lỗi cú pháp ở đây
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
      
      {/* Quạt */}
      <div style={getContainerStyle(fanOn)}>
        <h4 style={{color: '#284680'}}>Quạt</h4>
        <div style={{width: '100px', height:'100px', backgroundColor:'#3E7EF7' , borderRadius: '16px'}} className='d-flex justify-content-center align-items-center'>
          <FaFan style={{ ...iconStyle, ...fanStyle, color: '#fff' }} />
        </div>
        <div
          onClick={toggleFan}
          style={{ ...buttonStyle, color: fanOn ? '#fff' : '#6c757d' }}
        >
          {loading.fan ? <div className="spinner"></div> : (fanOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>
      
      {/* Tivi */}
      <div style={getContainerStyle(tvOn)}>
        <h4 style={{color: '#284680'}}>Tivi</h4>
        <div style={{width: '100px', height:'100px', backgroundColor:'#3E7EF7' , borderRadius: '16px'}} className='d-flex justify-content-center align-items-center'>
          <FaTv style={{ ...iconStyle, color: '#fff' }} />
        </div>
        <div
          onClick={toggleTv}
          style={{ ...buttonStyle, color: tvOn ? '#fff' : '#6c757d' }}
        >
          {loading.tv ? <div className="spinner"></div> : (tvOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>
      
      {/* Bóng đèn */}
      <div style={getContainerStyle(lightOn)}>
        <h4 style={{color: '#284680'}}>Bóng đèn</h4>
        <div style={{width: '100px', height:'100px', backgroundColor:'#3E7EF7' , borderRadius: '16px'}} className='d-flex justify-content-center align-items-center'>
          <FaLightbulb style={{ ...iconStyle, color: '#fff' }} />
        </div>
        <div
          onClick={toggleLight}
          style={{ ...buttonStyle, color: lightOn ? '#fff' : '#6c757d' }}
        >
          {loading.light ? <div className="spinner"></div> : (lightOn ? <FaToggleOn /> : <FaToggleOff />)}
        </div>
      </div>

    </div>
  );
};

export default Device;
