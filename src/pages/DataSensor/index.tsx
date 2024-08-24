import React, { useState } from 'react';


interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
  light: number;
  time: string;
}

const initialData: SensorData[] = [
  { id: 'packetId5449', temperature: 28, humidity: 77, light: 686, time: '18:10:45 - 12/08/2024' },
  { id: 'packetId5450', temperature: 28, humidity: 77, light: 686, time: '18:10:48 - 12/08/2024' },
  { id: 'packetId5451', temperature: 28, humidity: 77, light: 686, time: '18:20:43 - 12/08/2024' },
  { id: 'packetId5452', temperature: 28, humidity: 77, light: 686, time: '18:10:43 - 11/08/2024' },
  { id: 'packetId5453', temperature: 58, humidity: 75, light: 656, time: '18:10:43 - 12/08/2024' },
  { id: 'packetId5455', temperature: 28, humidity: 76, light: 886, time: '18:10:43 - 12/08/2024' },
  { id: 'packetId5457', temperature: 28, humidity: 77, light: 686, time: '18:10:43 - 12/08/2024' },
  { id: 'packetId5449', temperature: 28, humidity: 77, light: 686, time: '18:10:43 - 12/08/2024' },
  { id: 'packetId5449', temperature: 28, humidity: 77, light: 686, time: '18:10:43 - 12/08/2024' },
  { id: 'packetId5458', temperature: 28, humidity: 79, light: 676, time: '18:10:43 - 12/08/2024' }
];

const DataSensor: React.FC = () => {
  const [data, setData] = useState<SensorData[]>(initialData);
  const [sortConfig, setSortConfig] = useState<{ key: keyof SensorData; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Hàm sắp xếp dữ liệu theo cột
  const sortTable = (key: keyof SensorData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // Xử lý thay đổi đầu vào tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Xử lý khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    setData(filterData());
  };

  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filterData = () => {
    return initialData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="container-fluid">
      <div className="container mt-5">
        <h2 className="text-center">Table of Sensor Data</h2>
        <div className="filter-section">
          <input
            type="text"
            id="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="filter-button" onClick={handleSearchClick}>Tìm kiếm</button>
        </div>
        <table className="table table-hover mt-4" id="sensorTable">
          <thead>
            <tr>
              <th scope="col">
                Sensor ID
                <button 
                  onClick={() => sortTable('id')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9650; {/* Tam giác lên */}
                </button>
                <button 
                  onClick={() => sortTable('id')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9660; {/* Tam giác xuống */}
                </button>
              </th>
              <th scope="col">
                Nhiệt độ(°C)
                <button 
                  onClick={() => sortTable('temperature')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9650; {/* Tam giác lên */}
                </button>
                <button 
                  onClick={() => sortTable('temperature')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9660; {/* Tam giác xuống */}
                </button>
              </th>
              <th scope="col">
                Độ ẩm (%)
                <button 
                  onClick={() => sortTable('humidity')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9650; {/* Tam giác lên */}
                </button>
                <button 
                  onClick={() => sortTable('humidity')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9660; {/* Tam giác xuống */}
                </button>
              </th>
              <th scope="col">
                Ánh sáng (Lux)
                <button 
                  onClick={() => sortTable('light')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9650; {/* Tam giác lên */}
                </button>
                <button 
                  onClick={() => sortTable('light')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9660; {/* Tam giác xuống */}
                </button>
              </th>
              <th scope="col">
                Thời gian
                <button 
                  onClick={() => sortTable('time')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9650; {/* Tam giác lên */}
                </button>
                <button 
                  onClick={() => sortTable('time')}
                  style={{ 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    padding: '0',
                    margin: '0'
                  }}
                >
                  &#9660; {/* Tam giác xuống */}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.light}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSensor;