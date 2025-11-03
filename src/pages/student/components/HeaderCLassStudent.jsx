import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';

/**
 * Component Header
 * Sử dụng Navbar màu gradient
 */
function HeaderCLassStudent() {
  return (
    // Dùng 'background' thay vì 'backgroundColor'
    <Navbar style={{ background: 'linear-gradient(to right, #4a00e0, #8e2de2)' }} variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to={"classRoom"}>Classroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Trang chủ</Nav.Link>
            <Nav.Link href="#link">Thông báo</Nav.Link>
            <Nav.Link href="#profile">Tài khoản</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderCLassStudent;