import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BookOpen, User } from 'lucide-react'

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" className="shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <BookOpen size={32} className="me-2" />
          <span className="fw-bold fs-4">IELTS Admin System</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Item className="d-flex align-items-center">
            <div className="bg-white bg-opacity-10 rounded-pill px-3 py-2 d-flex align-items-center">
              <User size={20} className="me-2" />
              <span className="fw-medium">Admin</span>
            </div>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
