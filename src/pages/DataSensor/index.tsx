import React, { useState, useEffect } from 'react';
import { getDataByType } from '../../data/repositories/api';

interface SensorData {
  _id: string;
  temperature: number;
  humidity: number;
  light: number;
  createdAt: string;
}

const DataSensor: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof SensorData; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [dataFilter, setDataFilter] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataByType({
          content: '',
          searchBy: '',
          orderBy: 'createdAt',
          sortBy: 'desc',
          page: 1,
          pageSize: 10,
        });
        console.log('Fetched data:', data);
        setDataFilter(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const sortTable = (key: keyof SensorData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...dataFilter].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setDataFilter(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredData = dataFilter.filter(row =>
      row.temperature.toString().includes(searchTerm.toLowerCase())
    );
    setDataFilter(filteredData);
    setCurrentPage(1);
  };

  const currentData = dataFilter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(dataFilter.length / itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid" style={{ marginTop: '-50px' }}>
      <div className="container mt-5">
        <div className="filter-section">
          <input
            type="text"
            id="search-input"
            placeholder='Tìm kiếm theo nhiệt độ'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="filter-button" style={{ borderRadius: '10px', background: 'linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)' }} onClick={handleSearchClick}>
            Tìm kiếm
          </button>
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
                ID
              </th>
              <th scope="col">
                Nhiệt độ (°C)
                <button onClick={() => sortTable('temperature')}>&#9650;</button>
                <button onClick={() => sortTable('temperature')}>&#9660;</button>
              </th>
              <th scope="col">
                Độ ẩm (%)
                <button onClick={() => sortTable('humidity')}>&#9650;</button>
                <button onClick={() => sortTable('humidity')}>&#9660;</button>
              </th>
              <th scope="col">
                Ánh sáng (Lux)
                <button onClick={() => sortTable('light')}>&#9650;</button>
                <button onClick={() => sortTable('light')}>&#9660;</button>
              </th>
              <th scope="col">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{row._id}</td> {/* Hiển thị ký tự đầu của ID */}
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.light}</td>
                <td>{new Date(row.createdAt).toLocaleString('vi-VN')}</td> {/* Hiển thị thời gian theo dạng ngày/tháng/năm giờ */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-control">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Trang trước
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSensor;
