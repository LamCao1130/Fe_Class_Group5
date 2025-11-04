import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { LayoutDashboard, Users, GraduationCap } from 'lucide-react'

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '' },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap, path: 'teachers' },
    { id: 'classroom', label: 'ClassRoom', icon: Users, path: 'classroom' }
  ]

  const handleMenuClick = (item) => {
    setActiveMenu(item.id)
    navigate(item.path)
  }

  return (
    <div className="h-100 p-3">
      <Nav className="flex-column">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Nav.Item key={item.id} className="mb-2">
              <Nav.Link
                className={`d-flex align-items-center py-3 px-3 rounded-3 text-decoration-none ${
                  isActive 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-dark hover-bg-light'
                }`}
                onClick={() => handleMenuClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <IconComponent size={20} className="me-3" />
                <span className="fw-medium">{item.label}</span>
              </Nav.Link>
            </Nav.Item>
          )
        })}
      </Nav>
    </div>
  )
}

export default Sidebar
