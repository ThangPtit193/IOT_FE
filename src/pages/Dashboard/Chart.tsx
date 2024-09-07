import React from 'react'
import { Line } from 'react-chartjs-2';
import { baseUrl } from '../../const';
import { DATA_SENSOR_PATH } from '../../const/path';
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
} from 'chart.js'

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,

)


const Chart = () => {

  const [humidity, setHumidity] = React.useState<number[]>([]);
  const [temperature, setTemperature] = React.useState<number[]>([]);
  const [light, setLight] = React.useState<number[]>([]);

  let fetchOption: any = {
    method: "GET",
  }

  const getDataSensorChart = async () => {
    try {
      const response = await fetch(baseUrl + DATA_SENSOR_PATH, fetchOption);
      const responseData = await response.json();
      const humidityData = responseData.data.map((item: any) => item.humidity);
      const temperatureData = responseData.data.map((item: any) => item.temperature);
      const lightData = responseData.data.map((item: any) => item.light);
      console.log("humidityData", humidityData);
      console.log("tem", temperatureData);
      setHumidity(humidityData);
      setTemperature(temperatureData);
      setLight(lightData)
    } catch (err: any) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    // Thiết lập interval để gọi getDataSensor mỗi giây
    const interval = setInterval(() => {
      getDataSensorChart();
    }, 200); // 1000ms = 1s

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, []); // Mảng phụ thuộc trống [] đảm bảo rằng interval c

  const data = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ],
    datasets: [
      {
        label: 'Ánh sáng',
        data: light.slice(-10),
        backgroundColor: 'transparent',
        borderColor: '#fbc02d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
      {
        label: 'Nhiệt độ',
        data: temperature.slice(-10),
        backgroundColor: 'transparent',
        borderColor: '#d32f2f',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
      {
        label: 'Độ ẩm',
        data: humidity.slice(-10),
        backgroundColor: 'transparent',
        borderColor: '#1e88e5',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
    ]
  };
  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {

      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value: string | number) => value
        },

      }
    }
  }
  return (
    <div style={{ width: '90%', maxWidth: '1000px', marginLeft: '20px' }}>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3 className='text-gray-800'>Nhiệt độ</h3>
          <div style={{ width: '50px', height: '10px', backgroundColor: '#d32f2f', marginLeft: 5 }}></div>
        </div>
        <div className='d-flex align-items-center'>
          <h3 className='text-gray-800'>Độ ẩm</h3>
          <div style={{ width: '50px', height: '10px', backgroundColor: '#1e88e5', marginLeft: 5 }}></div>
        </div>
        <div className='d-flex align-items-center'>
          <h3 className='text-gray-800'>Ánh sáng</h3>
          <div style={{ width: '50px', height: '10px', backgroundColor: '#fbc02d', marginLeft: 5 }}></div>
        </div>
      </div>
      <Line data={data} options={options}></Line>
    </div>
  )
}

export default Chart