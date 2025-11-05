import React from "react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import styles from "../../../css/TeacherPage.module.css";
import { Link, useNavigate } from "react-router-dom";
const HeaderPageTeacher = ({ setShowJoinModal }) => {
  let navigate = useNavigate();
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            href="/teacher"
            className={`${styles.navbarBrand} fs-3`}
          >
            <i className="bi bi-book-fill me-3"></i>
            <span>Exam Master</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse
            className={`justify-content-end ${styles.navbarCollapse}`}
          >
            <Dropdown align="end">
              <Dropdown.Toggle
                className={`${styles.noCaret}`}
                as="div"
                id="dropdown-plus"
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  padding: "0 8px",
                }}
              >
                <i className="bi bi-plus" style={{ fontWeight: "bold" }}></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="m-4">
                <Dropdown.Item onClick={() => setShowJoinModal(true)}>
                  Tham gia lớp học
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  Tạo lớp học
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown align="end">
              <Dropdown.Toggle
                className={`${styles.noCaret}`}
                as="div"
                id="dropdown-custom-components"
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-person fs-3"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person-circle me-2"></i> Xem Hồ sơ
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigate("/");
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>{" "}
          </Navbar.Collapse>
        </Container>
      </Navbar>{" "}
    </div>
  );
};

export default HeaderPageTeacher;
