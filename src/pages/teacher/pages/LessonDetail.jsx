import React, { useEffect, useState } from "react";
import { data, Form, useNavigate, useParams } from "react-router";
import teacherService from "../services/TeacherSerivceApi";
import {
  Button,
  Card,
  Container,
  Dropdown,
  ListGroup,
  Modal,
  Nav,
  Navbar,
  Table,
} from "react-bootstrap";
import AddGrammarModal from "../components/AddGrammarModal";

const LessonDetail = () => {
  const { id } = useParams();

  const [render, setRender] = useState(false);

  const [showAddGrammar, setShowAddGrammar] = useState(false);

  useEffect(() => {
    async function fetchListVocabary() {
      teacherService.getVocabByLessonId(id).then((data) => setVocabList(data));
    }
    async function fetchListGrammar() {
      teacherService
        .getGrammrByLessonId(id)
        .then((data) => setGrammarList(data));
    }
    fetchListVocabary();
    fetchListGrammar();
  }, [render]);
  const [activeTab, setActiveTab] = useState("vocab");

  const navigate = useNavigate();

  const [vocabList, setVocabList] = useState([]);

  const [grammarList, setGrammarList] = useState([]);

  const [questionList, setQuestionList] = useState([]);

  const handleDelete = (id) => {
    teacherService.deleteVocab(id);
    setRender(!render);
  };

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
                onClick={() => setActiveTab("question")}
                active={activeTab === "question"}
                className="fw-medium"
              ></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <>
          <div className="d-flex justify-content-end mb-4">
            <Dropdown>
              <Dropdown.Toggle variant="success" className="shadow-sm">
                Thêm mới
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => navigate("/teacher/lesson/1/addvocab")}
                >
                  Thêm từ mới
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowAddGrammar(true)}>
                  Thêm ngữ pháp
                </Dropdown.Item>
                <Dropdown.Item>Thêm câu hỏi</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Card
            className={`mb-4 shadow-sm border-0 ${
              activeTab != "all" && activeTab != "vocab" ? "d-none" : ""
            }`}
          >
            {" "}
            <Card.Header className="bg-info text-white">
              <strong>Vocabulary ({vocabList.length})</strong>
            </Card.Header>
            <Card.Body>
              {vocabList ? (
                <Table>
                  <thead>
                    <tr>
                      <th className="" style={{ width: "40px" }}>
                        STT
                      </th>
                      <th>Từ vựng</th>
                      <th>Từ loại</th>
                      <th>Nghĩa</th>
                      <th>Phát âm</th>
                      <th>Ví dụ</th>
                      <th className="" style={{ width: "80px" }}>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocabList?.map((item, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <th>{item.englishWord}</th>
                        <th>{item.wordType}</th>
                        <th>{item.vietnameseMeaning}</th>
                        <th>{item.pronunciation}</th>
                        <th>{item.exampleSample} </th>
                        <th>
                          <i className="bi bi-pencil"></i>
                          <i
                            className="bi bi-trash"
                            onClick={() => handleDelete(item.id)}
                          ></i>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">Chưa có từ vựng nào.</p>
              )}
            </Card.Body>
          </Card>

          <Card
            className={`mb-4 shadow-sm border-0 ${
              activeTab != "all" && activeTab != "grammar" ? "d-none" : ""
            }`}
          >
            <Card.Header className="bg-success text-white">
              <strong>Grammar ({grammarList.length})</strong>
            </Card.Header>
            <Card.Body>
              {grammarList.length > 0 ? (
                grammarList.map((g, index) => (
                  <Card key={g.id} className="mb-4 shadow-sm border-0">
                    <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                      <strong>
                        {index + 1}. {g.title}
                      </strong>
                      <Button size="sm" variant="outline-light">
                        <i class="bi bi-trash"></i>
                      </Button>
                    </Card.Header>

                    <Card.Body>
                      <div className="mb-3">
                        <h6 className="text-primary fw-bold">Giải thích</h6>
                        <p className="mb-0">{g.explanation}</p>
                      </div>

                      <div className="mb-3">
                        <h6 className="text-primary fw-bold">Cấu trúc</h6>
                        <code className="bg-light d-inline-block px-2 py-1 rounded">
                          {g.structure}
                        </code>
                      </div>

                      <div className="mb-3">
                        <h6 className="text-primary fw-bold">Ví dụ</h6>
                        <ul className="list-unstyled mb-0">
                          {g.examples.split("\n").map((ex, i) => {
                            const [label, sentence] = ex.split(": ");
                            return (
                              <li key={i} className="mb-1">
                                <strong className="text-success">
                                  {label}:
                                </strong>{" "}
                                <span>{sentence}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-primary fw-bold">
                          Ghi chú sử dụng
                        </h6>
                        <ul className="list-unstyled mb-0">
                          {g.usageNotes.split("\n").map((note, i) => {
                            const [title, detail] = note.split(" (");
                            const cleanDetail = detail ? `(${detail}` : "";
                            return (
                              <li key={i} className="mb-1">
                                <strong>{title}</strong>{" "}
                                <span className="text-muted">
                                  {cleanDetail}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted py-4">
                  Chưa có ngữ pháp nào.
                </p>
              )}
            </Card.Body>
          </Card>

          <Card
            className={`mb-4 shadow-sm border-0 ${
              activeTab != "all" && activeTab != "question" ? "d-none" : ""
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
        <AddGrammarModal
          showGrammar={showAddGrammar}
          handleClose={() => setShowAddGrammar(false)}
        ></AddGrammarModal>
      </Container>
    </>
  );
};

export default LessonDetail;
