import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner,Button } from "react-bootstrap";
import { getLessonListApi } from "../studentApi/LessonApi";
import LessonCard from "./Lesson";
import { useNavigate, useParams } from "react-router";

function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
   const { classRoomId } = useParams();
  const navigate=useNavigate();
  useEffect(() => {
    async function fetchLessons() {
      try {
        const data = await getLessonListApi(classRoomId);
        console.log(data);
        setLessons(data || []);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, [classRoomId]);

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 className="fw-bold mb-4 text-primary">Danh sách bài học</h2>
      <Button onClick={() => navigate(`/student/classroom/${classRoomId}/exam`)} className="mb-3">Exam</Button>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Đang tải bài học...</p>
        </div>
      ) : lessons.length === 0 ? (
        <p className="text-center text-muted">Hiện chưa có bài học nào.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {lessons.map((lesson) => (
            <Col key={lesson.id}>
              <LessonCard
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default LessonList;
