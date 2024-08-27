import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Profile: React.FC = () => {
    return (
        <div className="container-fluid">
            <div className="profile-cards">
                {/* Profile Card 1 */}
                <div className="profile-card">
                    <div className="card-container">
                        <img
                            src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/419894680_1557986171632466_5352219294845925092_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=e0DX35vE-IQQ7kNvgHJMxd-&_nc_ht=scontent.fhan18-1.fna&oh=00_AYCPN9H3EVQpv1bB0gnskk4_jz4bP_rFWfyff1wL63JaXQ&oe=66CA423A"
                            alt="Profile Image"
                            className="profile-img"
                        />
                        <h2 className="name">Nguyễn Trọng Đức</h2>
                        <p className="title">D21HTTT06 <strong>PTIT</strong></p>
                        <p className="email">Email: <strong>tduczero178@gmail.com</strong></p>
                        <div className="info">
                            <p className="info-item"><strong>B21DCCN252</strong><br />Mã sinh viên</p>
                            <p className="info-item"><strong>0862158106</strong><br />Số điện thoại</p>
                        </div>
                        <div className="social-links">
                            <a href="https://www.facebook.com/duc.thuthien" target="_blank" className="facebook" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/tdzeros" target="_blank" className="instagram" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://github.com/ZDUC" target="_blank" className="github" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Profile Card 2 */}
                <div className="profile-card">
                    <div className="card-container">
                        <img
                            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t1.18169-9/10806308_1520975621512394_1633268389946773314_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=Ii5fNNYtPycQ7kNvgE36DI6&_nc_ht=scontent.fhan14-3.fna&oh=00_AYBnJY1i4RlayLJ8PMFrqUlLjIUZv7WSULbzL5IbKtQCgw&oe=66F0CE03"
                            alt="Profile Image"
                            className="profile-img"
                        />
                        <h2 className="name">Phạm Ngọc Thắng</h2>
                        <p className="title">D21HTTT06 <strong>PTIT</strong></p>
                        <p className="email">Email: <strong>example@example.com</strong></p>
                        <div className="info">
                            <p className="info-item"><strong>B21DCCN672</strong><br />Mã nhân viên</p>
                            <p className="info-item"><strong>0925776962</strong><br />Số điện thoại</p>
                        </div>
                        <div className="social-links">
                            <a href="https://www.facebook.com/kuka.linh" target="_blank" className="facebook" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://github.com/ThangPtit193" target="_blank" className="instagram" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://github.com/ThangPtit193" target="_blank" className="github" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
