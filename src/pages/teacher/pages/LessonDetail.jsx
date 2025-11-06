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
} from "react-bootstrap";
import VocabDetail from "../components/VocabDetail";
import GrammarDetail from "../components/GrammarDetail";
import QuestionDetail from "../components/QuestionDetail";

const LessonDetail = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("vocab");

  const navigate = useNavigate();

  const [questionList, setQuestionList] = useState([]);

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="mb-4 shadow-sm"
      >
        <Container>
          <Navbar.Brand className="fw-bold"></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => setActiveTab("all")}
                active={activeTab === "all"}
                className="fw-medium"
              ></Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab("vocab")}
                active={activeTab === "vocab"}
                className="fw-medium"
              >
                Vocabulary
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab("grammar")}
                active={activeTab === "grammar"}
                className="fw-medium"
              >
                Grammar
              </Nav.Link>
              <Nav.Link
                onClick={() => setActiveTab("questions")}
                active={activeTab === "questions"}
                className="fw-medium"
              >
                Question
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <>
          <div className="d-flex justify-content-end mb-4">
            {activeTab != "question" ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" className="shadow-sm">
                  Thêm mới
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => navigate(`/teacher/lesson/${id}/addvocab`)}
                  >
                    Thêm từ mới
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowAddGrammar(true)}>
                    Thêm ngữ pháp
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      navigate(`/teacher/lesson/${id}/addQuestion`)
                    }
                  >
                    Thêm câu hỏi
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  onClick={() => navigate(`/teacher/lesson/${id}/addQuestion`)}
                  variant="success"
                  className="shadow-sm"
                >
                  Thêm mới
                </Dropdown.Toggle>
              </Dropdown>
            )}
          </div>
          {activeTab === "vocab" && <VocabDetail id={id} />}
          {activeTab === "grammar" && <GrammarDetail id={id} />}
          {activeTab === "questions" && <QuestionDetail id={id} />}
          <Card
            className={`mb-4 shadow-sm border-0 ${
              activeTab != "question" ? "d-none" : ""
            }`}
          >
            {" "}
            <Card.Header className="bg-warning text-dark">
              <strong>Questions ({questionList.length})</strong>
            </Card.Header>
            <Card.Body>
              {questionList.length > 0 ? (
                <ListGroup variant="flush">
                  {questionList.map((q) => (
                    <ListGroup.Item
                      key={q.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{q.question}</strong>
                        <span className="badge bg-secondary ms-2">
                          {q.type}
                        </span>
                        <span className="badge bg-info ms-1">{q.level}</span>
                      </div>
                      <Button size="sm" variant="outline-danger"></Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">Chưa có câu hỏi nào.</p>
              )}
            </Card.Body>
          </Card>
        </>
      </Container>
    </>
  );
};

export default LessonDetail;
