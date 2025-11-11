import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Badge,
  OverlayTrigger,
  Tooltip,
  Tab,
  Nav,
  Alert,
} from "react-bootstrap";
import style from "../../../css/ClassDetail.module.css";
import { useNavigate, useParams } from "react-router";
import teacherService from "../services/TeacherSerivceApi";
import AddLessonModal from "../components/AddLessonModal";
import CreateExamModal from "../components/CreateExamModal";

const ClassDetail = () => {
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [zoom, setZoom] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataLessons, setDataLessons] = useState([]);
  const { id } = useParams();
  const [dataExam, setDataExam] = useState([[]]);
  const [render, setRender] = useState(false);
  const [comingExam, setComingExam] = useState([]);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await teacherService.getClassroomDetailById(id);
        const resLesson = await teacherService.getLessonByClassroomId(id);
        const resExam = await teacherService.getExamByClassroom(id);
        const resComing = await teacherService.getComingExam(id);
        setData(res);
        setDataLessons(resLesson);
        setDataExam(resExam);
        setComingExam(resComing);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết lớp học:", error);
      }
    }
    fetchDetail();
  }, [id, render]);
  const formatDateTimeToMinute = (isoString) => {
    if (!isoString) return "N/A"; // Xử lý trường hợp chuỗi rỗng

    const date = new Date(isoString);

    const formatter = new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formatter.format(date);
  };
  return (
    <div className={style.pageWrapper}>
      <Container className="py-4">
        <Card className={`${style.heroCard} shadow-sm border-0 mb-4`}>
          <div className={style.heroOverlay}></div>
          <Card.Body className="position-relative text-white d-flex flex-column justify-content-end p-5">
            <h1 className="fw-bold mb-1">{data?.name || "Tên lớp học"}</h1>
            <p className="mb-0 opacity-90">{data?.title || "Mô tả lớp học"}</p>
          </Card.Body>
        </Card>

        <Row>
          <Col lg="4" className="mb-4">
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-semibold text-muted mb-0">Mã lớp học</h6>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Nhấp để sao chép</Tooltip>}
                  >
                    <i
                      className={`bi bi-copy text-primary ${style.copyIcon}`}
                      onClick={() => {
                        navigator.clipboard.writeText(data?.code || "");
                        setZoom(true);
                        setTimeout(() => setZoom(false), 800);
                      }}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </OverlayTrigger>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span
                    className={`fs-3 fw-bold text-primary ${
                      zoom ? style.zoomCode : ""
                    }`}
                  >
                    {data?.code || "ABC123"}
                  </span>
                  <i
                    className="bi bi-zoom-in text-primary fs-5"
                    style={{ cursor: "pointer" }}
                    onClick={() => setZoom(!zoom)}
                  ></i>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header>Bài kiểm tra sắp đến </Card.Header>
              {comingExam.map((item) => (
                <Card.Body
                  className={style.comingExam}
                  onClick={() => navigate(`/teacher/exam/${item.id}?mode=exam`)}
                >
                  <div>{item.title}</div>
                  <div>{formatDateTimeToMinute(item.examDate)}</div>
                </Card.Body>
              ))}
            </Card>
          </Col>

          <Col lg="8">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Tab.Container defaultActiveKey="lessons">
                  <Nav variant="tabs" className="border-0">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="lessons"
                        className="d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-journal-text"></i>
                        Bài học
                        <Badge bg="primary" className="ms-1">
                          {dataLessons.length}
                        </Badge>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="exams"
                        className="d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-file-earmark-check"></i>
                        Bài kiểm tra
                        <Badge bg="danger" className="ms-1">
                          {dataExam.length}
                        </Badge>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="p-4">
                    <Tab.Pane eventKey="lessons">
                      <Button
                        variant="outline-primary"
                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
                        onClick={() => setShowAddLesson(true)}
                      >
                        <i className="bi bi-plus-circle"></i> Thêm mới Bài học
                      </Button>

                      {dataLessons.length > 0 ? (
                        dataLessons.map((lesson) => (
                          <Card
                            key={lesson.id}
                            className="border-0 shadow-sm mb-3"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/teacher/lesson/${lesson.id}`)
                            }
                          >
                            <Card.Body className="p-3 d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="fw-semibold mb-1">
                                  {lesson.title}
                                </h6>
                                <p className="text-muted small mb-0">
                                  {lesson.content}
                                </p>
                              </div>
                              <i className="bi bi-chevron-right text-muted"></i>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <Alert
                          variant="light"
                          className="text-center border-dashed py-4"
                        >
                          <i
                            className="bi bi-journal-text text-muted"
                            style={{ fontSize: "2rem" }}
                          ></i>
                          <p className="mb-0 mt-2">Chưa có bài học nào</p>
                        </Alert>
                      )}
                    </Tab.Pane>

                    <Tab.Pane eventKey="exams">
                      <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
                        onClick={() => setShowCreateExam(true)}
                      >
                        <i className="bi bi-plus-circle"></i> Thêm mới Bài kiểm
                        tra
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
                        onClick={() =>
                          navigate(`/teacher/classroom/${id}/examAttempt`)
                        }
                      >
                        <i className="bi bi-plus-circle"></i> Kết quả các bài
                        kiểm tra
                      </Button>
                      {dataExam.length > 0 ? (
                        dataExam.map((exam) => (
                          <Card
                            key={exam.id}
                            className="border-0 shadow-sm mb-3"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/teacher/exam/${exam.id}?mode=exam`)
                            }
                          >
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                  <h6 className="fw-semibold mb-1">
                                    {exam.title}
                                  </h6>
                                  <div className="d-flex gap-3 text-muted small">
                                    <span>
                                      <i className="bi bi-clock"></i>{" "}
                                      {exam.durationMinutes || "?"} phút
                                    </span>
                                    <span>
                                      <i className="bi bi-calendar"></i>{" "}
                                      {exam.examDate
                                        ? new Date(
                                            exam.examDate
                                          ).toLocaleDateString("vi-VN")
                                        : "—"}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-end">
                                  <Badge
                                    bg={
                                      exam.examDate &&
                                      new Date(exam.examDate) < new Date()
                                        ? "secondary"
                                        : "success"
                                    }
                                  >
                                    {exam.examDate &&
                                    new Date(exam.examDate) < new Date()
                                      ? "Đã đóng"
                                      : "Đang mở"}
                                  </Badge>
                                  <i className="bi bi-chevron-right text-muted ms-2"></i>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <Alert
                          variant="light"
                          className="text-center border-dashed py-4"
                        >
                          <i
                            className="bi bi-file-earmark-check text-muted"
                            style={{ fontSize: "2rem" }}
                          ></i>
                          <p className="mb-0 mt-2">Chưa có bài kiểm tra nào</p>
                        </Alert>
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <AddLessonModal
          show={showAddLesson}
          handleClose={() => setShowAddLesson(false)}
          onSave={() => setRender(!render)}
        />
        <CreateExamModal
          show={showCreateExam}
          handleClose={() => setShowCreateExam(false)}
          onSave={() => setRender(!render)}
        />
      </Container>
    </div>
  );
};
export default ClassDetail;
