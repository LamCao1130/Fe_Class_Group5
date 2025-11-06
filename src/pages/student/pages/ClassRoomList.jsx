import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ClassRoom from "./ClassRoom";
import { getClassRoomStudentApi } from "../studentApi/classRoomStudentApi";

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
    </Container>
  );
}

export default ClassRoomList;
