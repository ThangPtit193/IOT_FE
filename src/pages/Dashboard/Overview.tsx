import React from 'react'
import { Image } from 'react-bootstrap'

import Humidity from '../../assets/svg/humidity.svg'
import Heat from '../../assets/svg/heat.svg';
import Light from '../../assets/svg/light.svg';

const Overview = () => {
  return (
    <div className="row mx-2">

      <div className="col-xl-4 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Nhiệt độ
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-2" style={{ marginLeft: '12px' }}>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">30°C</div>
                  </div>
                  <div className="col-10" style={{ marginRight: '5px', width: '70%' }}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: '50%',
                          background: 'linear-gradient(to right, #ff6f61, #d32f2f)', // Gradient đỏ dần
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <Image src={Heat} alt="Logo" height={50} width={50} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-md-6 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Độ ẩm
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-2" style={{ marginLeft: '12px' }}>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">50%</div>
                  </div>
                  <div className="col-10" style={{ marginRight: '5px', width: '70%' }}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: '50%',
                          background: 'linear-gradient(to right, #36a2eb, #0000FF)', // Gradient xanh dương dần
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <Image src={Humidity} alt="Logo" height={50} width={50} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Ánh sáng
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-2" style={{ marginLeft: '12px' }}>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">30</div>
                  </div>
                  <div className="col-10" style={{ marginRight: '5px', width: '70%' }}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: '50%',
                          background: 'linear-gradient(to right, #ffeb3b, #fbc02d)', // Gradient vàng dần
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <Image src={Light} alt="Logo" height={50} width={50} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Overview
