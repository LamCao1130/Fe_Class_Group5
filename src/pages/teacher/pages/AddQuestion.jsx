import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Badge,
} from "react-bootstrap";
import { Plus, Question, Trash3 } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import teacherService from "../services/TeacherSerivceApi";

const partTypes = [
  { value: "fill", label: "Điền vào chỗ trống" },
  { value: "mc", label: "Trắc nghiệm" },
  { value: "reading", label: "Reading" },
  { value: "writing", label: "Writing" },
];

const AddQuestion = () => {
  const navigate = useNavigate();
  const lessonId = useParams();
  const [partTitle, setPartTitle] = useState("");
  const [partType, setPartType] = useState("fill");
  const [reading, setReading] = useState({
    title: "",
    passageContent: "",
  });
  const [questions, setQuestions] = useState([
    {
      text: "",
      fillAnswer: "",
      mcOptions: [""],
      correctAnswers: [],
    },
  ]);
  const [alert, setAlert] = useState({ show: false, msg: "", variant: "" });
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        fillAnswer: "",
        mcOptions: [""],
        correctAnswers: [],
      },
    ]);
  };

  const removeQuestion = (qIndex) => {
    if (questions.length === 1) {
      showAlert("Phải có ít nhất 1 câu hỏi!", "warning");
      return;
    }
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  const updateQuestionText = (qIndex, value) => {
    setQuestions(
      questions.map((q, idx) => (idx === qIndex ? { ...q, text: value } : q))
    );
  };

  const updateFillAnswer = (qIndex, value) => {
    setQuestions(
      questions.map((q, idx) =>
        idx === qIndex ? { ...q, fillAnswer: value } : q
      )
    );
  };

  const addMcOption = (qIndex) => {
    setQuestions(
      questions.map((q, idx) =>
        idx === qIndex ? { ...q, mcOptions: [...q.mcOptions, ""] } : q
      )
    );
  };

  const removeMcOption = (qIndex, optIndex) => {
    setQuestions(
      questions.map((q, idx) =>
        idx === qIndex
          ? {
              ...q,
              mcOptions: q.mcOptions.filter((_, i) => i !== optIndex),
              correctAnswers: q.correctAnswers.filter(
                (ans) => ans !== optIndex
              ),
            }
          : q
      )
    );
  };

  const updateMcOption = (qIndex, optIndex, value) => {
    setQuestions(
      questions.map((q, idx) =>
        idx === qIndex
          ? {
              ...q,
              mcOptions: q.mcOptions.map((opt, i) =>
                i === optIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const toggleCorrectAnswer = (qIndex, optIndex) => {
    setQuestions(
      questions.map((q, idx) =>
        idx === qIndex
          ? {
              ...q,
              correctAnswers: q.correctAnswers.includes(optIndex)
                ? q.correctAnswers.filter((ans) => ans !== optIndex)
                : [...q.correctAnswers, optIndex],
            }
          : q
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!partTitle.trim()) {
    //   showAlert("Vui lòng nhập tiêu đề Part!", "danger");
    //   return;
    // }

    if (partType === "reading" && !reading) {
      showAlert("Vui lòng nhập đoạn văn Reading!", "danger");
      return;
    }

    const validQuestions = questions
      .map((q) => {
        if (!q.text.trim()) return null;

        if (partType === "fill") {
          if (!q.fillAnswer.trim()) return null;
          return {
            questionText: q.text,
            type: partType,
            correctAnswer: q.fillAnswer.trim(),
            lessonId: lessonId.id,
          };
        }

        if (partType == "writing") {
          return {
            questionText: q.text,
            type: partType,
            correctAnswer: "",
            lessonId: lessonId.id,
          };
        }

        if (partType === "mc" || partType == "reading") {
          const filledOptions = q.mcOptions.map((o, index) => {
            return {
              optionText: o.trim(),
              isCorrect: q.correctAnswers.includes(index),
            };
          });
          if (filledOptions.length < 2 || q.correctAnswers.length === 0)
            return null;
          return {
            questionText: q.text,
            type: partType,
            correctAnswer: "",
            options: filledOptions,
          };
        }

        return {
          text: q.text,
          type: partType,
        };
      })
      .filter(Boolean);
    if (validQuestions.length === 0) {
      showAlert("Vui lòng nhập ít nhất 1 câu hỏi hợp lệ!", "danger");
      return;
    }

    const createQuestion = {
      questionTypeDto: {
        lessonId: lessonId.id,
        name: partTitle,
        type: partType,
        questions: validQuestions,
      },
      readingDto: reading,
    };

    console.log(createQuestion);
    await teacherService.createQuestion(createQuestion);
    showAlert("Tạo Part thành công!", "success");
    // navigate(`/teacher/lesson/${lessonId.id}`);
    // setPartTitle("");
    // setPartType("fill");
    // setReadingPassage("");
    // setQuestions([
    //   { text: "", fillAnswer: "", mcOptions: [""], correctAnswers: [] },
    // ]);
  };

  const showAlert = (msg, variant) => {
    setAlert({ show: true, msg, variant });
    setTimeout(() => setAlert({ show: false, msg: "", variant: "" }), 3000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Tạo Part Mới</h4>
              <Badge bg="light" text="dark">
                {questions.length} câu
              </Badge>
            </Card.Header>
            <Card.Body>
              {alert.show && (
                <Alert variant={alert.variant} className="mb-4">
                  {alert.msg}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Tiêu đề Part</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="VD: Part 1: Fill in the blank"
                    value={partTitle}
                    onChange={(e) => setPartTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    Loại câu hỏi (áp dụng cho toàn Part)
                  </Form.Label>
                  <Form.Select
                    value={partType}
                    onChange={(e) => {
                      setPartType(e.target.value);
                      setReadingPassage("");
                      setQuestions(
                        questions.map((q) => ({
                          ...q,
                          fillAnswer: "",
                          mcOptions: [""],
                          correctAnswers: [],
                        }))
                      );
                    }}
                  >
                    {partTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {partType === "reading" && (
                  <Card className="mb-4 border-warning">
                    <Card.Header className="bg-warning text-dark">
                      <strong>Reading Passage</strong>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <strong>Tiêu đề bài đọc</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tiêu đề bài đọc (ví dụ: The Impact of Technology on Education)..."
                          value={reading.title}
                          onChange={(e) =>
                            setReading({
                              ...reading,
                              title: e.target.value,
                            })
                          }
                          className="fw-medium"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Nhập đoạn văn Reading</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          placeholder="Dán đoạn văn ở đây..."
                          value={reading.passageContent}
                          onChange={(e) =>
                            setReading({
                              ...reading,
                              passageContent: e.target.value,
                            })
                          }
                          className="font-monospace small"
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                )}

                <hr className="my-4" />

                {questions.map((q, qIndex) => (
                  <Card key={qIndex} className="mb-3 border">
                    <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                      <strong>Câu {qIndex + 1}</strong>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => removeQuestion(qIndex)}
                      >
                        <Trash3 />
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Nội dung câu hỏi</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder={
                            partType === "fill"
                              ? "VD: The capital of Vietnam is _____."
                              : ""
                          }
                          value={q.text}
                          onChange={(e) =>
                            updateQuestionText(qIndex, e.target.value)
                          }
                        />
                      </Form.Group>

                      {partType === "fill" && (
                        <Form.Group className="mb-3">
                          <Form.Label className="text-success fw-bold">
                            Đáp án đúng
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="VD: Hanoi"
                            value={q.fillAnswer}
                            onChange={(e) =>
                              updateFillAnswer(qIndex, e.target.value)
                            }
                            className="border-success"
                          />
                          <Form.Text className="text-muted">
                            Nhập chính xác đáp án mà học sinh phải điền.
                          </Form.Text>
                        </Form.Group>
                      )}

                      {partType != "fill" && partType != "writing" && (
                        <div className="border p-3 rounded bg-light">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <Form.Label className="fw-bold text-primary mb-0">
                              Đáp án
                            </Form.Label>
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() => addMcOption(qIndex)}
                            >
                              <Plus /> Thêm đáp án
                            </Button>
                          </div>

                          {q.mcOptions.map((opt, optIndex) => (
                            <Form.Group
                              key={optIndex}
                              className="mb-2 d-flex align-items-center gap-2"
                            >
                              <Form.Check
                                type="checkbox"
                                checked={q.correctAnswers.includes(optIndex)}
                                onChange={() =>
                                  toggleCorrectAnswer(qIndex, optIndex)
                                }
                                disabled={!opt.trim()}
                                className="me-2"
                              />
                              <Form.Control
                                type="text"
                                placeholder={`Đáp án ${optIndex + 1}`}
                                value={opt}
                                onChange={(e) =>
                                  updateMcOption(
                                    qIndex,
                                    optIndex,
                                    e.target.value
                                  )
                                }
                                className="flex-grow-1"
                              />
                              {q.mcOptions.length > 1 && (
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() =>
                                    removeMcOption(qIndex, optIndex)
                                  }
                                  className="flex-shrink-0"
                                >
                                  <Trash3 />
                                </Button>
                              )}
                            </Form.Group>
                          ))}

                          <Form.Text className="text-muted">
                            Check vào ô để chọn{" "}
                            <strong>nhiều đáp án đúng</strong>.
                          </Form.Text>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}

                <div className="text-center mb-4">
                  <Button variant="outline-primary" onClick={addQuestion}>
                    <Plus /> Thêm câu hỏi
                  </Button>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={() => window.history.back()}
                  >
                    Hủy
                  </Button>
                  <Button variant="success" type="submit">
                    Tạo Part
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuestion;
