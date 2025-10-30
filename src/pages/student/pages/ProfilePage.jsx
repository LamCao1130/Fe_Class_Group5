import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Button, Modal, Form } from "react-bootstrap";
import { getProfileApi, updateProfileApi } from "../studentApi/profileStudentApi";

const ProfilePage = () => {
  // Thông tin ban đầu của người dùng
  const [user, setUser] = useState({
    // fullName: "Nguyễn Văn A",
    // email: "nguyenvana@example.com",
    // studentCode: "STU2025001",
    // className: "CNTT - K18",
    // joinDate: "2023-08-15",
  });

  const [showModal, setShowModal] = useState(false);

  // Tạm lưu dữ liệu đang chỉnh sửa
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    async function getProfile() {
      const data = await getProfileApi();
      setUser(data);
    }
    getProfile();
  }, []);

  // Mở Modal
  const handleShow = () => {
    setFormData({ ...user });
    setShowModal(true);
  };

  // Đóng Modal
  const handleClose = () => setShowModal(false);

  // Khi thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Khi ấn Lưu thay đổi
  const handleSave = async () => {
    try{
    const data = await updateProfileApi(formData);
    setUser(data);
    setShowModal(false);
    }catch(error){
        throw error;
    }

  };

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg p-4 border-0 rounded-4"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Row className="align-items-center">
          <Col md={8}>
            <h3 className="fw-bold text-primary mb-3">{user.fullName}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Số Điện Thoại:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Địa Chỉ:</strong> {user.address}
            </p>
            <p>
              <strong>Ngày Sinh:</strong> {user.dateOfBirth}
            </p>
            <p>
              <strong>Mật Khẩu:</strong>{" "}
              {user.password ? "*".repeat(user.password.length) : ""}
            </p>
            <div className="mt-3">
              <Button variant="primary" className="me-2" onClick={handleShow}>
                Chỉnh sửa hồ sơ
              </Button>
              <Button variant="outline-danger">Đăng xuất</Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Modal chỉnh sửa */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa Chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày Sinh</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật Khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
