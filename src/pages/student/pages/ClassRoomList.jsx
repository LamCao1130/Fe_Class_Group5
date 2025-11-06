import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ClassRoom from "./ClassRoom";
import { getClassRoomStudentApi } from "../studentApi/classRoomStudentApi";
<<<<<<< HEAD
import { Plus } from "react-bootstrap-icons";
import JoinClassroomModal from "../components/JoinClassroomModal";

function ClassRoomList() {
  const classes = [];

  const [classRoom, setClassRoom] = useState([
    // {
    //   id: 1,
    //   title: "Lớp Toán 10A1",
    //   description: "Giáo viên: Thầy Nguyễn Văn A",
    // },
    // { id: 2, title: "Lớp Văn 11B2", description: "Giáo viên: Cô Trần Thị B" },
    // { id: 3, title: "Lớp Lý 12C3", description: "Giáo viên: Thầy Lê Văn C" },
    // { id: 4, title: "Lớp Hóa 10A2", description: "Giáo viên: Cô Phạm Thị D" },
  ]);

  const [show, setShow] = useState(false);

  const addClassRoom = () => {
    setShow(true);
  };

  useEffect(() => {
    async function getClassRoomStudent() {
      const data = await getClassRoomStudentApi();
      console.log(data);
      setClassRoom(data.content);
    }
    getClassRoomStudent();
  }, []);
  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between">
        <h2>Các lớp học của bạn</h2>
        <Button
          className="mb-3"
          variant="outline-primary"
          onClick={addClassRoom}
        >
          <Plus /> Tham gia lớp học
        </Button>
      </div>
      <Row>
        {classRoom.map((cls) => (
          <Col key={cls.id} sm={12} md={6} lg={4} className="mb-4">
            <ClassRoom title={cls.title} teacherName={cls.teacherName} />
          </Col>
        ))}
      </Row>
      <JoinClassroomModal
        handleClose={() => setShow(false)}
        show={show}
      ></JoinClassroomModal>
=======

function ClassRoomList() {
  const [classRoom, setClassRoom] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getClassRoomStudent() {
      try {
        const data = await getClassRoomStudentApi();
        console.log("Classroom data:", data);
        setClassRoom(data.content || []);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        setLoading(false);
      }
    }
    getClassRoomStudent();
  }, []);

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 className="fw-bold mb-4 text-primary">Các lớp học của bạn</h2>
    
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Đang tải danh sách lớp học...</p>
        </div>
      ) : classRoom.length === 0 ? (
        <p className="text-center text-muted">Bạn chưa tham gia lớp học nào.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {classRoom.map((cls) => (
            <Col key={cls.id}>
              <ClassRoom id={cls.id || cls.classRoomId} title={cls.title} teacherName={cls.teacherName} />
            </Col>
          ))}
        </Row>
      )}
>>>>>>> 1f5acb417c22060ff9c91e3d4443af488e12593b
    </Container>
  );
}

export default ClassRoomList;
