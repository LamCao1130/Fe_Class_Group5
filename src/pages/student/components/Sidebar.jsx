import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap'; // Import từ React Bootstrap
import './Sidebar.css'; // Giữ file CSS nếu cần tùy chỉnh thêm (hoặc xóa nếu dùng toàn Bootstrap)

const Sidebar = () => {
  return (
    <div className="sidebar bg-light border-end" style={{ width: '250px', height: '100vh', position: 'fixed', left: 0, top: 0, overflowY: 'auto' }}>
      <div className="sidebar-header p-3 border-bottom">
        <h2 className="text-primary mb-0">Classroom</h2>
      </div>
      <Nav className="flex-column sidebar-menu p-2">
        <NavItem className="sidebar-item">
          <NavLink href="#stream" className="d-flex align-items-center">
            <span className="icon me-2">📚</span> Home
          </NavLink>
        </NavItem>
        <NavItem className="sidebar-item">
          <NavLink href="#classwork" className="d-flex align-items-center">
            <span className="icon me-2">📝</span> Classwork
          </NavLink>
        </NavItem>
        <NavItem className="sidebar-item">
          <NavLink href="#grades" className="d-flex align-items-center">
            <span className="icon me-2">📊</span> Settings
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;