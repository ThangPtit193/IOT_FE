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
  const [totalData, setTotalData] = useState<SensorData[]>([]); // Tất cả dữ liệu
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataByType({
          content: '',
          searchBy: '',
          orderBy: 'createdAt',
          sortBy: 'desc',
          page: 1, // Chỉ cần lấy dữ liệu ở trang đầu tiên
          pageSize: 1000, // Lấy một số lượng lớn dữ liệu để không bị giới hạn
        });
        setTotalData(data);
        console.log('data', data)
        setDataFilter(data.slice(0, itemsPerPage)); // Lấy dữ liệu cho trang đầu tiên
        setTotalPages(Math.ceil(data.length / itemsPerPage)); // Tính toán tổng số trang
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [itemsPerPage]);

  useEffect(() => {
    const currentData = totalData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    setDataFilter(currentData);
  }, [currentPage, itemsPerPage, totalData]);

  const sortTable = (key: keyof SensorData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...totalData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setTotalData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredData = totalData.filter(row =>
      row.temperature.toString().includes(searchTerm.toLowerCase())
    );
    setTotalData(filteredData);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage)); // Cập nhật số trang sau khi lọc
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
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <table className="table table-hover mt-4" id="sensorTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nhiệt độ (°C)
                <button onClick={() => sortTable('temperature')}>&#9650;</button>
                <button onClick={() => sortTable('temperature')}>&#9660;</button>
              </th>
              <th scope="col">Độ ẩm (%)
                <button onClick={() => sortTable('humidity')}>&#9650;</button>
                <button onClick={() => sortTable('humidity')}>&#9660;</button>
              </th>
              <th scope="col">Ánh sáng (Lux)
                <button onClick={() => sortTable('light')}>&#9650;</button>
                <button onClick={() => sortTable('light')}>&#9660;</button>
              </th>
              <th scope="col">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter.map((row, index) => (
              <tr key={index}>
                <td>{row._id}</td>
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.light}</td>
                <td>{new Date(row.createdAt).toLocaleString('vi-VN')}</td>
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
