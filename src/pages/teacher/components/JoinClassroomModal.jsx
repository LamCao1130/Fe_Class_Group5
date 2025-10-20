import React from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

const JoinClassroomModal = ({ show, handleClose }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tham gia lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="classCodeInput">
              <Form.Label>
                <strong>Mã lớp</strong>
              </Form.Label>
              <Form.Label>
                Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào
                đây.
              </Form.Label>
              <FloatingLabel
                controlId="classCodeInput"
                label="Mã lớp"
                className="m-a"
              >
                <Form.Control type="text" placeholder="Mã lớp" />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Tham gia
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JoinClassroomModal;
