import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ClassRoom from "./ClassRoom";
import { getClassRoomStudentApi } from "../studentApi/classRoomStudentApi";
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
    </Container>
  );
}

export default ClassRoomList;
