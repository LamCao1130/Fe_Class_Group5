import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import ClassRoom from "./ClassRoom";
import { getClassRoomStudentApi } from "../studentApi/classRoomStudentApi";
import studentApi from "../studentApi/studentApi";
import { ToastContainer, toast } from "react-toastify";

function ClassRoomList() {
  const [classRoom, setClassRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState();
  const [reRender, setReRender] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getClassRoomStudent() {
      try {
        const data = await studentApi.getClassRoomStudentApi();
        console.log("Classroom data:", data);
        setClassRoom(data.content || []);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        setLoading(false);
      }
    }
    getClassRoomStudent();
  }, [reRender]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập mã lớp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name=""
            id=""
            placeholder="Nhập mã lớp vd: ABCDEF1"
            style={{
              border: "1px solid grey",
              padding: "10px",
              width: "100%",
              outline: "none",
            }}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              try {
                await studentApi.joinClassRoom(code);
                toast.success("Tham gia thành công");
                setReRender(!reRender);
                handleClose();
              } catch (e) {
                toast.error(e.response.data);
                handleClose();
              }
            }}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        fluid
        className="p-4"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="fw-bold mb-4 text-primary">Các lớp học của bạn</h2>

          <Button variant="primary" onClick={handleShow}>
            Tham gia lớp học
          </Button>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2">Đang tải danh sách lớp học...</p>
          </div>
        ) : classRoom.length === 0 ? (
          <p className="text-center text-muted">
            Bạn chưa tham gia lớp học nào.
          </p>
        ) : (
          <Row xs={1} sm={2} md={3} lg={3} className="g-4">
            {classRoom.map((cls) => (
              <Col key={cls.id}>
                <ClassRoom
                  id={cls.id || cls.classRoomId}
                  title={cls.title}
                  teacherName={cls.teacherName}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default ClassRoomList;
