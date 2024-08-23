import React from 'react'
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
  Legend
} from 'chart.js'

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,

)

const Chart = () => {
  const data = {
    labels: [
      0, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ],
    datasets: [
      {
        label: 'Ánh sáng',
        data: [800, 780, 600, 800, 700, 500, 600],
        backgroundColor: 'transparent',
        borderColor: '#f26c6d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
      {
        label: 'Nhiệt độ',
        data: [22, 25, 21, 24, 26, 23, 27],
        backgroundColor: 'transparent',
        borderColor: '#36a2eb',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
      {
        label: 'Độ ẩm',
        data: [60, 65, 55, 70, 66, 58, 72],
        backgroundColor: 'transparent',
        borderColor: '#4bc0c0',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
  ]
  };
  const options: ChartOptions<'line'> = {
    responsive: true,
    scales:{
      y: {
        min:0,
        max: 1200,
        ticks: {
          stepSize: 200,
          callback: (value: string | number) => value
        },

      }
    }
  }
  return (
    <div style={{width:'1000px', marginLeft:'20px' }}>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3 className='text-gray-800'>Nhiệt độ</h3>
          <div style={{width: '50px', height:'10px', backgroundColor:'#36a2eb', marginLeft: 5}}></div>
        </div>
        <div className='d-flex align-items-center'>
          <h3 className='text-gray-800'>Độ ẩm</h3>
          <div style={{width: '50px', height:'10px', backgroundColor:'#4bc0c0', marginLeft: 5}}></div>
        </div>
        <div className='d-flex align-items-center'>
          <h3 className='text-gray-800'>Ánh sáng</h3>
          <div style={{width: '50px', height:'10px', backgroundColor:'#f26c6d', marginLeft: 5}}></div>
        </div>
      </div>
      <Line data={data} options={options}></Line>
    </div>
  )
}

export default Chart