import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import style from "../../../css/ClassDetail.module.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import teacherService from "../services/TeacherSerivceApi";
import AddLessonModal from "../components/AddLessonModal";

const ClassDetail = () => {
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [zoom, setZoom] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataLessons, setDataLessons] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await teacherService.getClassroomDetailById(id);
        const resLesson = await teacherService.getLessonByClassroomId(id);
        setData(res);
        setDataLessons(resLesson);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết lớp học:", error);
      }
    }
    fetchDetail();
  }, [id]);
  let renderLessons = dataLessons?.map((item) => {
    return (
      <Card
        style={{ cursor: "pointer" }}
        className="mt-3"
        onClick={() => navigate(`lesson/${item.id}`)}
      >
        <Card.Header className="text-primary">{item.title}</Card.Header>
        <Card.Body>
          <Card.Title>{item.content}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  });
  return (
    <div>
      <Container className="margin-auto" style={{ width: "60vw" }}>
        <Card
          className=" bg-danger d-flex justify-content-end"
          style={{ height: "30vh" }}
        >
          <div className="ps-3 mb-2 text-light">
            <strong>{data?.name}</strong>
            <br />
            {data?.title}
          </div>
        </Card>
        <Row>
          <Col lg="3" className="mt-3">
            <Card>
              <div className="d-flex justify-content-between pt-3 px-3">
                <span>
                  <strong>Mã lớp</strong>
                </span>
                <span>
                  <i className="bi bi-three-dots-vertical"></i>
                </span>
              </div>
              <div className="my-3 ps-3 text-primary fs-5 d-flex justify-content-around">
                <span>{data?.code}</span>{" "}
                <i
                  className={`bi bi-zoom-in ${style.zoom}`}
                  onClick={() => setZoom(!zoom)}
                ></i>
              </div>
            </Card>
            <Card className="mt-3 px-3">
              <div className="py-3">
                <strong>Sắp đến hạn</strong>
              </div>
              <span>Không có bài tập nào sắp đến hạn</span>
              <div className="my-3 text-primary text-end">Xem tất cả</div>
            </Card>
          </Col>
          <Col>
            <Card className="mt-3 p-3">
              <div className={style.addNewLessonContainer}>
                <Button
                  variant="success"
                  onClick={() => setShowAddLesson(true)}
                >
                  <i className="bi bi-plus-circle me-2"></i> Thêm mới Bài học
                </Button>
              </div>
            </Card>
            {renderLessons}
          </Col>
        </Row>
        <AddLessonModal
          show={showAddLesson}
          handleClose={() => setShowAddLesson(false)}
        ></AddLessonModal>
      </Container>
    </div>
  );
};

export default ClassDetail;
