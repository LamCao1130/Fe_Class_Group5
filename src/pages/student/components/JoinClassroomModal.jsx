import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { joinClassroom } from "../studentApi/classRoomStudentApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const JoinClassroomModal = ({ show, handleClose }) => {
  const [code, setCode] = useState();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const accountId = decoded.accountId;
  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      await joinClassroom({ code: code, accountId: accountId });
      toast.success("Tham gia lớp học thành công");
      handleClose();

      navigate("/student/classRoom");
    } catch (error) {
      console.log(error.status);
      if (error.status == 400) {
        toast.error("Lớp học đấy đã tồn tại");
      } else {
        toast.error("Sai mã lớp học.Vui lòng thử lại");
      }
    }
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
                <Form.Control
                  type="text"
                  placeholder="Mã lớp"
                  onChange={(e) => setCode(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Tham gia
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JoinClassroomModal;
