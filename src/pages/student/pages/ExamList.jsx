import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { getLessonListApi } from "../studentApi/LessonApi";
import LessonCard from "./Lesson";
import { useParams } from "react-router";
import ExamCard from "./Exam";
import { getExamClassRoomId } from "../studentApi/ExamApi";

function ExamList() {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
   const { classRoomId } = useParams();

  useEffect(() => {
    async function fetchExam() {
      try {
        const data = await getExamClassRoomId(classRoomId);
        console.log(data);
        setExam(data || []);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExam();
  }, [classRoomId]);

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 className="fw-bold mb-4 text-primary">Danh sách bài kiểm tra</h2>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Đang tải bài học...</p>
        </div>
      ) : exam.length === 0 ? (
        <p className="text-center text-muted">Hiện chưa có bài học nào.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {exam.map((ex) => (
            <Col key={ex.id}>
              <ExamCard
                id={ex.id}
                title={ex.title}
                description={ex.description}
                durationMinutes={ex.durationMinutes}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ExamList;
