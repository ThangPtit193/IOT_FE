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
  const [page, setPage] = useState<string>('1'); // Trang hiện tại
  const [pageSize, setPageSize] = useState<string>('10'); // Kích thước trang
  const [dataFilter, setDataFilter] = useState<SensorData[]>([]);
  const [content, setContent] = useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('temperature'); // Giá trị tìm kiếm ban đầu là 'temperature'
  const [orderBy, setOrderBy] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0); // Tổng số bản ghi

  useEffect(() => {
    const fetch = async () => {
      const totalRes = await getDataByType({
        content: content,
        searchBy: searchBy,
        orderBy: orderBy,
        sortBy: sortBy,
        page: '',
        pageSize: '',
      })
      console.log('total', totalRes.data.length);
      setTotalCount(totalRes.data.length)
    }
    fetch()
  }, [content, searchBy, orderBy, sortBy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataByType({
          content: content,
          searchBy: searchBy,
          orderBy: orderBy,
          sortBy: sortBy,
          page: page,
          pageSize: pageSize,
        });
        setDataFilter(response.data || []);
        console.log('data', response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [content, searchBy, orderBy, sortBy, page, pageSize]);

  const sortTable = (key: keyof SensorData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setOrderBy(key); // Trường cần sắp xếp (ví dụ: 'temperature')
    setSortBy(direction);
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setContent(searchTerm);
    setPage('1');
  };

  const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(e.target.value);
    setPage('1');
  };

  const totalPages = Math.ceil(totalCount / Number(pageSize));

  return (
    <div className="container-fluid" style={{ marginTop: '-50px' }}>
      <div className="container mt-5">
        <div className="filter-section">
          <input
            type="text"
            id="search-input"
            placeholder={`Tìm kiếm theo ${searchBy === 'temperature' ? 'nhiệt độ' : searchBy === 'humidity' ? 'độ ẩm' : 'ánh sáng'}`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="temperature">Nhiệt độ</option>
            <option value="humidity">Độ ẩm</option>
            <option value="light">Ánh sáng</option>
          </select>
          <button
            className="filter-button"
            style={{ borderRadius: '10px', background: 'linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%)', marginLeft: '10px' }}
            onClick={handleSearchClick}
          >
            Tìm kiếm
          </button>
        </div>
        <div className="pagination-control">
          <label htmlFor="itemsPerPage">Số dòng trên mỗi trang: </label>
          <select value={pageSize} onChange={changePageSize}>
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
            {dataFilter.length > 0 ? dataFilter.map((row, index) => (
              <tr key={row._id}>
                <td>{row._id}</td>
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.light}</td>
                <td>{new Date(row.createdAt).toLocaleString('vi-VN')}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
          <button
            onClick={() => setPage((prev) => (parseInt(prev) - 1).toString())} // Trang trước
            disabled={page === '1'}
            style={{ marginRight: '10px' }}
          >
            Trang trước
          </button>
          <span>{`Trang ${page} / ${totalPages}`}</span>
          <button
            onClick={() => setPage((prev) => (parseInt(prev) + 1).toString())} // Trang tiếp
            disabled={parseInt(page) >= totalPages}
            style={{ marginLeft: '10px' }}
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSensor;
