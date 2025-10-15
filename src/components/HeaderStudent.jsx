import React from "react";
import { Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { Outlet } from "react-router";

const HeaderStudent = () => {
  return (
    <>
      <Container fluid>
        <Row className="bg-dark px-5 ">
          <Col xs={6} className=" text-light">
            <small>
              <i className="bi bi-telephone text-light my-2 me-2 d-inline-block"></i>
              +012 345 6789
            </small>
            <small className="mx-3">|</small>
            <small>
              <i className="bi bi-envelope-fill text-light me-2 d-inline-block"></i>
              tohuybhth@gmail.com
            </small>
          </Col>
          <Col xs={6} className="text-light text-end ">
            <small>
              <i class="bi bi-facebook   my-2 me-2  d-inline-block"></i>
              <i class="bi bi-twitter    my-2 me-2  d-inline-block"></i>
              <i class="bi bi-linkedin   my-2 me-2 d-inline-block"></i>
              <i class="bi bi-instagram  my-2 me-2 d-inline-block"></i>
              <i class="bi bi-youtube    my-2 me-2 d-inline-block"></i>
            </small>
          </Col>
        </Row>
        <Navbar className=" px-5">
          <Container fluid>
            <i className="fa fa-book-reader mr-3"></i>
            <Navbar.Brand href="#" className="fs-3 text-primary">
              <i className="bi bi-book-fill me-3"></i>
              Exam Master
            </Navbar.Brand>

            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Classroom</Nav.Link>
              <Nav.Link href="#action2">Exam Schedule</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HeaderStudent;
