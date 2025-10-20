import React, { useState } from "react";
import { Container, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import ReusableTooltip from "../components/ReusableTooltip";
import styles from "../../../css/ListStudent.module.css";

const ListStudent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Container style={{ width: "50vw" }}>
        <div className="d-flex justify-content-between mt-5 mb-3 pe-3 border-bottom">
          <span className="fs-4">
            <strong>Giáo viên</strong>
          </span>
        </div>
        <div className="mb-5"> Nguyễn Thị Điệu (FE FPTU HN)</div>
        <div className="d-flex justify-content-between mt-5 mb-3 pe-3 border-bottom">
          <span className="fs-4">
            <strong>Sinh viên</strong>
          </span>
          <div>
            <span>27 sinh viên</span>
            <ReusableTooltip tooltipText={"Mời sinh viên"}>
              <i
                className="bi bi-person-add mx-3"
                onClick={() => setOpen(true)}
              ></i>
            </ReusableTooltip>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <input type="checkbox"></input>
            <span className="ms-5">Cao Hải Lâm</span>
          </div>
          <Dropdown className={`${styles.dropdown}`} align="start">
            <Dropdown.Toggle
              className={`${styles.noCaret}`}
              as="div"
              id="dropdown-plus"
              style={{
                cursor: "pointer",
                padding: "0 8px",
              }}
            >
              <i className="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="m-4">
              <Dropdown.Item style={{ fontSize: "font-size: 0.95rem;" }}>
                Gưi Email cho sinh viên
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Ẩn sinh viên</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Xóa sinh viên</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Modal show={open} onHide={setOpen}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mời học viên</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập tên hoặc email"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <span className="text-primary">Hủy</span>
            <span>Tạo</span>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ListStudent;
