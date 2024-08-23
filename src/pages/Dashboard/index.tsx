import React from 'react'
import Overview from './Overview'
import Chart from './Chart'
import Device from './Device'

const Dashboard = () => {
  return (
    <div className="">
        <Overview/>
        <div className='d-md-flex'>
          <Chart/>
          <Device/>
        </div>
    </div>
  )
}

export default Dashboard