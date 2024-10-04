import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDeviceByTime } from '../../data/repositories/api';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Device: React.FC = () => {
    const [startDateTime, setStartDateTime] = useState<Date | null>(null); // Thời gian bắt đầu
    const [endDateTime, setEndDateTime] = useState<Date | null>(null); // Thời gian kết thúc
    const [filteredData, setFilteredData] = useState<any[]>([]); // Dữ liệu đã lọc để hiển thị
    const [page, setPage] = useState<number>(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState<number>(10); // Kích thước trang

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDeviceByTime({
                    startTime: '', // Không truyền giá trị thời gian để lấy toàn bộ dữ liệu
                    endTime: '',
                    page: page,
                    pageSize: pageSize,
                });
                console.log("result", result);
                setFilteredData(result?.data || []); // Lưu dữ liệu vào state filteredData
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, [page, pageSize]); // Chạy lại khi thay đổi page hoặc pageSize

    const handleSearch = async () => {
        try {
            const data = await getDeviceByTime({
                startTime: startDateTime ? startDateTime.toISOString() : '',
                endTime: endDateTime ? endDateTime.toISOString() : '',
                page: page,
                pageSize: pageSize,
            });
            setFilteredData(data?.data || []); // Lưu dữ liệu vào state filteredData
        } catch (error) {
            console.error('Lỗi khi tìm kiếm dữ liệu:', error);
        }
    };

    const convertToVietnamTime = (utcDate: string) => {
        const date = new Date(utcDate);
        const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // Cộng thêm 7 giờ
        return format(vietnamTime, 'dd/MM/yyyy HH:mm:ss', { locale: vi }); // Định dạng thời gian
    };

    return (
        <div className="container-fluid">
            <div className="filter-section">
                <DatePicker
                    selected={startDateTime}
                    onChange={(date) => setStartDateTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    timeIntervals={1}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                    timeCaption="Giờ"
                    placeholderText="Chọn thời gian bắt đầu"
                />
                <DatePicker
                    selected={endDateTime}
                    onChange={(date) => setEndDateTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    timeIntervals={1}
                    dateFormat="dd/MM/yyyy HH:mm:ss"
                    timeCaption="Giờ"
                    placeholderText="Chọn thời gian kết thúc"
                />
                <button
                    className="filter-button"
                    onClick={handleSearch}
                    style={{
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)',
                    }}
                >
                    Tìm kiếm
                </button>
            </div>

            {/* Căn chỉnh pageSize ở góc phải trên */}
            <div className="page-size-control" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
                <label style={{ marginRight: '10px' }}>
                    Số bản ghi trên trang:
                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>

            {/* Bảng hiển thị dữ liệu thiết bị */}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Thiết bị</th>
                        <th>Hành động</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                            <tr key={index}>
                                <td>{row._id}</td>
                                <td>{row.deviceName}</td>
                                <td>{row.action ? 'Bật' : 'Tắt'}</td>
                                <td>{convertToVietnamTime(row.createdAt)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>Không có dữ liệu nào để hiển thị</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Căn chỉnh page ở góc phải dưới */}
            <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Trang trước
                    disabled={page === 1}
                    style={{ marginRight: '10px' }}
                >
                    Trang trước
                </button>
                <span>{`Trang ${page}`}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)} // Trang tiếp
                    style={{ marginLeft: '10px' }}
                >
                    Trang tiếp
                </button>
            </div>
        </div>
    );
};

export default Device;
