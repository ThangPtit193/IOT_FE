import React, { useState } from 'react';

const Device: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([
        { id: 'packetId63', device: 'Đèn', action: 'Tắt', time: '15:53:35 - 12/09/2024' },
        { id: 'packetId38', device: 'Đèn', action: 'Bật', time: '16:53:32 - 12/09/2024' },
        { id: 'packetId63', device: 'Quạt', action: 'Tắt', time: '17:53:35 - 12/10/2024' },
        { id: 'packetId38', device: 'Quạt', action: 'Bật', time: '18:53:32 - 12/10/2024' },
        { id: 'packetId63', device: 'Tivi', action: 'Tắt', time: '19:53:35 - 12/11/2024' },
        { id: 'packetId38', device: 'Tivi', action: 'Bật', time: '20:53:32 - 12/11/2024' },
        // Thêm các hàng khác nếu cần
    ]);

    const handleSearch = () => {
        // Thực hiện tìm kiếm khi bấm nút
        const data = [
            { id: 'packetId63', device: 'Đèn', action: 'Tắt', time: '15:53:35 - 12/09/2024' },
            { id: 'packetId38', device: 'Đèn', action: 'Bật', time: '16:53:32 - 12/09/2024' },
            { id: 'packetId63', device: 'Quạt', action: 'Tắt', time: '17:53:35 - 12/10/2024' },
            { id: 'packetId38', device: 'Quạt', action: 'Bật', time: '18:53:32 - 12/10/2024' },
            { id: 'packetId63', device: 'Tivi', action: 'Tắt', time: '19:53:35 - 12/11/2024' },
            { id: 'packetId38', device: 'Tivi', action: 'Bật', time: '20:53:32 - 12/11/2024' },
            // Thêm các hàng khác nếu cần
        ];

        const filtered = data.filter(row =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        setFilteredData(filtered);
    };

    return (
        <div className="container-fluid">
            <h2 className="text-center">Action History</h2> {/* Căn giữa tiêu đề */}

            <div className="filter-section">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Tìm kiếm theo thiết bị hoặc hành động"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="filter-button" onClick={handleSearch} style={{borderRadius:'10px', background: 'linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)'}}>
                    Tìm kiếm
                </button>
            </div>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Sensor ID</th>
                        <th>Thiết bị</th>
                        <th>Hành động</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.device}</td>
                            <td>{row.action}</td>
                            <td>{row.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Device;
