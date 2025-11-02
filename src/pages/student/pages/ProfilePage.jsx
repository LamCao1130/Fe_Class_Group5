import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import {
  changePasswordApi,
  getProfileApi,
  updateProfileApi,
} from "../studentApi/profileStudentApi";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [formData, setFormData] = useState({ ...user });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function getProfile() {
      const data = await getProfileApi();
      setUser(data);
    }
    getProfile();
  }, []);

  // ==== CHỈNH SỬA THÔNG TIN ====
  const handleShowEdit = () => {
    setFormData({ ...user });
    setShowEditModal(true);
  };
  const handleCloseEdit = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const data = await updateProfileApi(formData);
      setUser(data);
      setShowEditModal(false);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  // ==== ĐỔI MẬT KHẨU ====
  const handleShowPasswordModal = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(true);
  };
  const handleClosePasswordModal = () => setShowPasswordModal(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
       toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      await changePasswordApi({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });
       toast.success("Đổi mật khẩu thành công!");
      setShowPasswordModal(false);
    } catch (error) {
       toast.error(error.message || "Đổi mật khẩu thất bại!");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card
        className="shadow-lg p-4 border-0 rounded-4"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Row className="align-items-center">
          <Col md={8}>
            <h3 className="fw-bold text-primary mb-3">{user.fullName}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Số Điện Thoại:</strong> {user.phoneNumber}</p>
            <p><strong>Địa Chỉ:</strong> {user.address}</p>
            <p><strong>Ngày Sinh:</strong> {user.dateOfBirth}</p>
            <div className="mt-3">
              <Button variant="primary" className="me-2" onClick={handleShowEdit}>
                Chỉnh sửa hồ sơ
              </Button>
              <Button variant="warning" className="me-2" onClick={handleShowPasswordModal}>
                Đổi mật khẩu
              </Button>
              <Button variant="outline-danger">Đăng xuất</Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* MODAL CHỈNH SỬA THÔNG TIN */}
      <Modal show={showEditModal} onHide={handleCloseEdit} centered>
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
                value={formData.fullName || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa Chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày Sinh</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>Hủy</Button>
          <Button variant="primary" onClick={handleSave}>Lưu thay đổi</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ĐỔI MẬT KHẨU */}
      <Modal show={showPasswordModal} onHide={handleClosePasswordModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu hiện tại</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handlePasswordSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfilePage;
