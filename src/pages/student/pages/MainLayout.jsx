import { Outlet } from "react-router";
import HeaderComponent from "../components/HeaderStudent";
import Sidebar from "../components/Sidebar";
import { Container,Row,Col } from "react-bootstrap";

const MainLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HeaderComponent />

      <Container fluid style={{ flex: "1 0 auto" }}>
        <Row style={{ minHeight: "calc(100vh - 56px - 72px)" }}>
          {" "}
          {/* 56px header, 72px footer */}
          {/* Sidebar */}
          <Col md={3} lg={2} className="bg-light p-0">
            <Sidebar />
          </Col>
          {/* Main Content */}
          <Col md={9} lg={10} className="bg-white">
            <main>
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MainLayout;
