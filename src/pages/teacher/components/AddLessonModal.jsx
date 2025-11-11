import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import teacherService from "../services/TeacherSerivceApi";
const initialRowDefault = {
  classRoomId: "",
  title: "",
  description: "",
  content: "",
  homeworkDeadline: "",
  homeworkAttachmentUrl: "",
};
const AddLessonModal = ({ show, handleClose, onSave }) => {
  const { id } = useParams();
  const [form, setForm] = useState({ ...initialRowDefault, classRoomId: id });
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async () => {
    if (
      form.title.trim() == "" ||
      form.description.trim() == "" ||
      form.homeworkDeadline == ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin các trường");
      return;
    }
    await teacherService.createLesson(form);
    setForm({ ...initialRowDefault });
    toast.success("Lưu thành công");
    onSave();
    handleClose();
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Bài Học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="TitleInput">
              <Form.Label>
                <strong>Tiêu đề</strong>
              </Form.Label>
              <FloatingLabel
                controlId="TitleInput"
                label="Tiêu đề bài học"
                className="m-a"
              >
                <Form.Control
                  value={form.title}
                  name="title"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  type="text"
                  placeholder="Nhập tiêu đề"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="DescriptionInput">
              <Form.Label>
                <strong>Mô tả</strong>
              </Form.Label>
              <FloatingLabel
                controlId="DescriptionInput"
                label="Mô tả ngắn gọn"
                className="m-a"
              >
                <Form.Control
                  value={form.description}
                  name="description"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  as="textarea"
                  rows={2}
                  placeholder="Nhập mô tả"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Deadline">
              <Form.Label>
                <strong>Hạn nộp</strong>
              </Form.Label>
              <FloatingLabel
                controlId="Deadline"
                label="Chọn ngày giờ nộp bài"
                className="m-a"
              >
                <Form.Control
                  value={form.homeworkDeadline}
                  name="homeworkDeadline"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  type="datetime-local"
                  placeholder="Chọn hạn nộp"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Attachement Url">
              <Form.Label>
                <strong>Link đính kèm</strong>
              </Form.Label>
              <Form.Control
                value={form.homeworkAttachmentUrl}
                name="homeworkAttachmentUrl"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                as="textarea"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddLessonModal;
