import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
const initialRowDefault = {
  title: "",
  examType: "QUIZ",
  description: "",
  durationMinutes: 60,
  totalMarks: 100,
  passingScore: 50,
  examDate: "",
};
const CreateExamModal = ({ show, handleClose, onSave }) => {
  const token = localStorage.getItem("accessToken");
  const decode = jwtDecode(token);
  const userId = decode.accountId;
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [formData, setFormData] = useState({
    ...initialRowDefault,
    classRoomId: id,
    createdBy: userId,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await teacherService.createExam(formData);
      toast.success("Create exam success");
      setFormData({
        ...initialRowDefault,
      });
      onSave();

      handleClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title> Tạo Bài Kiểm Tra Mới</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTitle">
                <Form.Label>
                  Tên Bài Kiểm Tra <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formExamType">
                <Form.Label>Loại Bài Thi</Form.Label>
                <Form.Select
                  name="examType"
                  value={formData.examType}
                  onChange={handleChange}
                >
                  <option value="QUIZ">Quiz Ngắn</option>
                  <option value="MIDTERM">Giữa Kỳ</option>
                  <option value="FINAL">Cuối Kỳ</option>
                  <option value="PRACTICE">Luyện Tập</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDuration">
                <Form.Label>
                  Thời Lượng (phút) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="durationMinutes"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  min="10"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formExamDate">
                <Form.Label>Ngày Thi</Form.Label>
                <Form.Control
                  type="date"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formTotalMarks">
                <Form.Label>
                  Tổng Điểm <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formPassingScore">
                <Form.Label>
                  Điểm Đạt <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="passingScore"
                  value={formData.passingScore}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo Bài Kiểm Tra"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateExamModal;
