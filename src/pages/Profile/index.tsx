import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Profile: React.FC = () => {
    return (
        <div className="container-fluid">
            <div className="profile-cards">
                {/* Profile Card 1 */}
                <div className="profile-card">
                    <div className="d-flex flex-column align-items-center">

                        <img
                            src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/419894680_1557986171632466_5352219294845925092_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KT7Ne7h7XcoQ7kNvgGeMWDZ&_nc_ht=scontent.fhan18-1.fna&oh=00_AYARVlgp_M2w-rjUcMf540MYjlW2q-F09mag84FuMQMdAg&oe=66E3167A"
                            alt="Profile"
                            className="profile-img"
                        />
                        <h2 className="name">Nguyễn Trọng Đức</h2>
                        <p className="title">D21HTTT06 <strong>PTIT</strong></p>
                        <p className="email">Email: <strong >tduczero178@gmail.com</strong></p>
                        <div className="info">
                            <p className="info-item"><strong>B21DCCN252</strong><br />Mã sinh viên</p>
                            <p className="info-item"><strong>0862158106</strong><br />Số điện thoại</p>
                        </div>
                        <div className="d-flex">
                            <a href="https://www.facebook.com/duc.thuthien" target="_blank" className="facebook" rel="noopener noreferrer" >
                                <i className="fab fa-facebook" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                            <a href="https://www.instagram.com/tdzeros" target="_blank" className="instagram" rel="noopener noreferrer">
                                <i className="fab fa-instagram" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                            <a href="https://github.com/ZDUC" target="_blank" className="github" rel="noopener noreferrer">
                                <i className="fab fa-github" style={{ fontSize: '40px' }}></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Profile Card 2 */}
                <div className="profile-card">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img
                            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t1.18169-9/10806308_1520975621512394_1633268389946773314_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=Ii5fNNYtPycQ7kNvgE36DI6&_nc_ht=scontent.fhan14-3.fna&oh=00_AYBnJY1i4RlayLJ8PMFrqUlLjIUZv7WSULbzL5IbKtQCgw&oe=66F0CE03"
                            alt="Profile"
                            className="profile-img"
                        />
                        <h2 className="name">Phạm Ngọc Thắng</h2>
                        <p className="title">D21HTTT06 <strong>PTIT</strong></p>
                        <p className="email" style={{ wordBreak: 'break-word' }}>Email: <strong>thangpham19032003@gmail.com</strong></p>
                        <div className="info">
                            <p className="info-item"><strong>B21DCCN672</strong><br />Mã sinh viên</p>
                            <p className="info-item"><strong>0922128688</strong><br />Số điện thoại</p>
                        </div>
                        <div className="d-flex">
                            <a href="https://www.facebook.com/kuka.linh" target="_blank" className="facebook" rel="noopener noreferrer">
                                <i className="fab fa-facebook" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                            <a href="https://www.instagram.com/thangpham193/" target="_blank" className="instagram" rel="noopener noreferrer">
                                <i className="fab fa-instagram" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                            <a href="https://github.com/ThangPtit193" target="_blank" className="github" rel="noopener noreferrer">
                                <i className="fab fa-github" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
