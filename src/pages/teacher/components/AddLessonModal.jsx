import React from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

const AddLessonModal = ({ show, handleClose }) => {
  const handleSubmit = () => {
    handleClose();
  };
  return (
    <div>
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
                <Form.Control type="text" placeholder="Nhập tiêu đề" />
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
                <Form.Control as="textarea" rows={2} placeholder="Nhập mô tả" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Instruction">
              <Form.Label>
                <strong>Hướng dẫn Bài tập</strong>
              </Form.Label>
              <FloatingLabel
                controlId="Instruction"
                label="Hướng dẫn chi tiết bài tập"
                className="m-a"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Nhập hướng dẫn"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Max score">
              <Form.Label>
                <strong>Điểm tối đa</strong>
              </Form.Label>
              <FloatingLabel
                controlId="Max score"
                label="Điểm tối đa"
                className="m-a"
              >
                <Form.Control
                  min={"1"}
                  type="number"
                  placeholder="Nhập điểm tối đa"
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
                  type="datetime-local"
                  placeholder="Chọn hạn nộp"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Attachement Url">
              <Form.Label>
                <strong>File đính kèm</strong>
              </Form.Label>
              <Form.Control type="file" />
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
