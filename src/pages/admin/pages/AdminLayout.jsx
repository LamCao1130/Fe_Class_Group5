import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import  "../../../App.css";


export default function AdminLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="app d-flex flex-column min-vh-100">
      <Header />
      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0 h-100">
          <Col lg={2} md={3} className="sidebar-col">
            <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </Col>
          <Col lg={10} md={9} className="main-content-col">
            <main className="main-content p-4"><Outlet /></main>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
