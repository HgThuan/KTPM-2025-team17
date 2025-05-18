import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  // Danh sách các menu item
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: '📊' },
    { path: '/patients', name: 'Bệnh nhân', icon: '👨‍⚕️' },
    { path: '/appointments', name: 'Lịch hẹn', icon: '📅' },
    { path: '/prescriptions', name: 'Đơn thuốc / Phiếu khám', icon: '💊' },
    { path: '/doctors', name: 'Thông tin bác sĩ', icon: '👨‍⚕️' }
  ];

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                isActive ? 'active' : ''
              }
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;