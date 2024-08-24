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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setData(filterData());
    setCurrentPage(1);
  };

  const filterData = () => {
    return initialData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
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
          <button className="filter-button" style={{borderRadius:'10px', background: 'linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)'}} onClick={handleSearchClick}>Tìm kiếm</button>
        </div>
        <div className="pagination-control">
          <label htmlFor="itemsPerPage">Số dòng trên mỗi trang: </label>
          <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
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
                  &#9650;
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
                  &#9660;
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
                  &#9650;
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
                  &#9660;
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
                  &#9650;
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
                  &#9660;
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
                  &#9650;
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
                  &#9660;
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
                  &#9650;
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
                  &#9660;
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
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
        <div className="pagination-control">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Trang trước
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSensor;
