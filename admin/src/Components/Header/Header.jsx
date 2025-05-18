import React, { useState, useEffect } from 'react';
import './Header.css';
import Button from '../UI/Button';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');

  // Hàm cập nhật đồng hồ
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    // Cập nhật ngay lập tức
    updateClock();
    
    // Cập nhật mỗi giây
    const timerId = setInterval(updateClock, 1000);

    // Cleanup khi component unmount
    return () => clearInterval(timerId);
  }, []);

  const handleLogout = () => {
    // Xử lý logic đăng xuất
    window.close();
    setTimeout(() => {
      window.location.href = "about:blank";
    }, 100);
  };

  return (
    <header className="app-header">
      <h1 className="header-title">Hệ thống quản lý khám bệnh - Bác sĩ</h1>
      <div className="header-controls">
        <span className="clock-display">{currentTime}</span>
        <Button 
          id="logout-btn"
          onClick={handleLogout}
          className="logout-button"
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  );
};

export default Header;