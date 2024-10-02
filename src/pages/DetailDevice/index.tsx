import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Device: React.FC = () => {
    const [startDateTime, setStartDateTime] = useState<Date | null>(null);
    const [endDateTime, setEndDateTime] = useState<Date | null>(null);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const originalData = [
        { id: 'packetId63', device: 'Đèn', action: 'Tắt', time: '15:53:35 - 12/09/2024' },
        { id: 'packetId38', device: 'Đèn', action: 'Bật', time: '16:53:32 - 12/09/2024' },
        { id: 'packetId63', device: 'Quạt', action: 'Tắt', time: '17:53:35 - 12/10/2024' },
        { id: 'packetId38', device: 'Quạt', action: 'Bật', time: '18:53:32 - 12/10/2024' },
        { id: 'packetId63', device: 'Tivi', action: 'Tắt', time: '19:53:35 - 12/11/2024' },
        { id: 'packetId38', device: 'Tivi', action: 'Bật', time: '20:53:32 - 12/11/2024' },
    ];

    // Hiển thị tất cả dữ liệu ban đầu khi trang được tải
    React.useEffect(() => {
        setFilteredData(originalData);
    }, []);

    const handleSearch = () => {
        if (!startDateTime || !endDateTime) return;

        const filtered = originalData.filter(row => {
            // Chuyển đổi thời gian thành định dạng 'yyyy/mm/dd hh:mm:ss'
            const [time, date] = row.time.split(' - ');
            const [day, month, year] = date.split('/');
            const rowTime = new Date(`${year}/${month}/${day} ${time}`); // Chuyển đổi thời gian đúng cách

            return rowTime >= startDateTime && rowTime <= endDateTime;
        });

        setFilteredData(filtered);
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
                <button className="filter-button" onClick={handleSearch} style={{ borderRadius: '10px', background: 'linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)' }}>
                    Tìm kiếm
                </button>
            </div>

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
                                <td>{row.id}</td>
                                <td>{row.device}</td>
                                <td>{row.action}</td>
                                <td>{row.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>Không có dữ liệu nào để hiển thị</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Device;
