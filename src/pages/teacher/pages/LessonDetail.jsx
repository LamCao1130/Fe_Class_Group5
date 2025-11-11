import React, { useEffect, useState } from "react";
import { data, Form, useNavigate, useParams } from "react-router";
import teacherService from "../services/TeacherSerivceApi";
import {
  Button,
  Card,
  Container,
  Dropdown,
  ListGroup,
  Nav,
  Navbar,
  ToastContainer,
} from "react-bootstrap";
import VocabDetail from "../components/VocabDetail";
import GrammarDetail from "../components/GrammarDetail";
import QuestionDetail from "../components/QuestionDetail";
import AddGrammarModal from "../components/AddGrammarModal";
import { toast } from "react-toastify";

const LessonDetail = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("vocab");

  const [showAddGrammar, setShowAddGrammar] = useState(false);

  const navigate = useNavigate();


  const [questionList, setQuestionList] = useState([]);
  const [message, setMessage] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (message.message && toast[message.type]) {
      const normalizedType = message.type.toLowerCase();
      toast[normalizedType](message.message);
      setMessage({ message: "", type: "" });
    }
  }, [message]);

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">
            Bài Học Chi Tiết (ID: {id})
          </Navbar.Brand>
          <Button
            variant="warning"
            onClick={() => navigate(`/teacher/lesson/${id}/historySubmit`)}
            className="fw-bold"
          >
            Xem Bài Nộp (HomeWork)
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="shadow-sm">
              Thêm Mới Nội Dung
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate(`/teacher/lesson/${id}/addvocab`)}
              >
                Thêm Từ Vựng
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setShowAddGrammar(true)}>
                Thêm Ngữ Pháp
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate(`/teacher/lesson/${id}/addQuestion`)}
              >
                Thêm Câu Hỏi/Bài Tập
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Nav variant="tabs" defaultActiveKey="vocab">
            <Nav.Item>
              <Nav.Link
                eventKey="vocab"
                active={activeTab === "vocab"}
                onClick={() => setActiveTab("vocab")}
              >
                Từ Vựng
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="grammar"
                active={activeTab === "grammar"}
                onClick={() => setActiveTab("grammar")}
              >
                Ngữ Pháp
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="questions"
                active={activeTab === "questions"}
                onClick={() => setActiveTab("questions")}
              >
                Bài Tập
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Card className="shadow-lg border-0">
          <Card.Body className="p-4">
            {activeTab === "vocab" && <VocabDetail id={id} />}
            {activeTab === "grammar" && <GrammarDetail id={id} />}
            {activeTab === "questions" && <QuestionDetail id={id} />}
          </Card.Body>
        </Card>

        <AddGrammarModal
          type={"Thêm mới"}
          setMessage={setMessage}
          showGrammar={showAddGrammar}
          handleClose={() => setShowAddGrammar(false)}
        />
      </Container>
    </>
  );
};
export default LessonDetail;
