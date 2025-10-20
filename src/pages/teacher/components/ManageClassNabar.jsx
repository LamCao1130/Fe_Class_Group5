import { Container, Nav, Navbar } from "react-bootstrap";
import style from "../../../css/TeacherMangerNavbar.module.css";
import ReusableTooltip from "./ReusableTooltip";
const ManageClass = () => {
  return (
    <Container fluid style={{ padding: 0 }}>
      <Navbar className={`bg-body-tertiary m-0 ${style.navbar}`}>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Bảng tin</Nav.Link>
            <Nav.Link href="#link">Bài tập trên lớp</Nav.Link>
            <Nav.Link href="/teacher/manageClass/list">Mọi người</Nav.Link>
            <Nav.Link href="#link">Điểm</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <ReusableTooltip
            tooltipText={"Cài đặt lớp học"}
            tooltipId="settings-icon"
            placement="top"
          >
            <span>
              <i className="bi bi-gear me-4"></i>
            </span>
          </ReusableTooltip>

          <ReusableTooltip
            tooltipText={"Thời gian biểu lớp học"}
            tooltipId="schedule-icon"
            placement="top"
          >
            <span>
              <i className="bi bi-calendar me-4"></i>{" "}
            </span>
          </ReusableTooltip>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default ManageClass;
