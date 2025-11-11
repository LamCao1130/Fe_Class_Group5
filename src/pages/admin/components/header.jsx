import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { BookOpen, User, LogOut } from 'lucide-react'
import axiosApi from '../../../components/AxiosApi'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/"); 
  }

  return (
    <Navbar bg="primary" variant="dark" className="shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <BookOpen size={32} className="me-2" />
          <span className="fw-bold fs-4">EngJoy</span>
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-3">
          <div className="bg-white bg-opacity-10 rounded-pill px-3 py-2 d-flex align-items-center">
            <User size={20} className="me-2" />
            <span className="fw-medium">Admin</span>
          </div>

          <Button 
            variant="outline-light" 
            className="d-flex align-items-center"
            style={{ borderRadius: '50px', padding: '6px 14px' }}
            onClick={handleLogout}
          >
            <LogOut size={18} className="me-2" />
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
