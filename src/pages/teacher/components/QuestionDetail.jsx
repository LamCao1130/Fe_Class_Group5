import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Badge,
  ListGroup,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import EditQuestionModal from "./EditQuestionModal";

const QuestionDetail = () => {
  const params = new URLSearchParams(location.search);
  const isExam = params.get("mode") == "exam";
  const [questionGroups, setQuestionGroups] = useState([]);
  const { id } = useParams();
  const [render, setRender] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState();
  const [editingGroup, setEditingGroup] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const handleDeleteGroup = (questionType) => {
    setConfirm(true);
    setDeleted(questionType);
  };
  const speak = (text, lang = "en-US", rate = 1, volume = 1) => {
    window.speechSynthesis.cancel();

    if (!text || text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.volume = volume;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang.startsWith(lang.split("-")[0])) ||
      voices.find((v) => v.default);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };
  const handleEdit = (question) => {
    setEditingGroup(question);
    setShowEdit(true);
  };

  const handleClose = () => {
    setConfirm(false);
  };
  useEffect(() => {
    teacherService
      .getQuestionByExam(id)
      .then((data) => setQuestionGroups(data));
  }, [render]);
  console.log(questionGroups);
  const renderFillInTheBlank = (question, index) => {
    const isVerbForm =
      question.questionText.includes("( )") ||
      question.questionText.includes("...");
    const displayText = question.questionText.replace("...", "_____");

    return (
      <ListGroup.Item key={question.id} className="border-0 px-0">
        <div className="d-flex align-items-start">
          <span className="me-2 fw-bold text-primary">{index}.</span>
          <div className="flex-grow-1">
            {isVerbForm ? (
              <p className="mb-1">
                {displayText.split("_____")[0]}
                <Form.Control
                  type="text"
                  size="sm"
                  className="d-inline-block mx-2"
                  style={{ width: "120px" }}
                  disabled
                  placeholder={question.correctAnswer}
                />
                {displayText.split("_____")[1]}
              </p>
            ) : (
              <p className="mb-1">{displayText}</p>
            )}
            <small className="text-success">
              <strong>Đáp án:</strong> {question.correctAnswer}
            </small>
          </div>
        </div>
      </ListGroup.Item>
    );
  };

  const renderMultipleChoice = (question, index) => {
    return (
      <ListGroup.Item key={question.id} className="border-0 px-0">
        <div className="d-flex align-items-start">
          <span className="me-2 fw-bold text-primary">{index}.</span>
          <div className="flex-grow-1">
            <p className="mb-2">{question.questionText}</p>
            <div className="ps-3">
              {question.options?.map((opt) => (
                <Form.Check
                  key={opt.id}
                  type="checkbox"
                  label={opt.optionText}
                  name={`question-${question.id}`}
                  disabled
                  checked={opt.correctAnswer}
                  className={
                    opt.correctAnswer ? "text-success fw-bold" : "text-muted"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </ListGroup.Item>
    );
  };

  const renderReading = (group, index) => {
    const passage = group.readingDto;

    return (
      <Card
        key={group.questionTypeDto.questionTypeId}
        className="mb-4 shadow-sm"
      >
        <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
          <strong>
            {group?.questionTypeDto?.name} (
            {group?.questionTypeDto?.questions?.length})
          </strong>

          <div>
            <Button
              size="sm"
              variant="light"
              className="me-2"
              onClick={() => handleEdit(group.questionTypeDto.questionTypeId)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() =>
                handleDeleteGroup({
                  id: group.questionTypeDto.questionTypeId,
                  readingId: group.readingDto?.id,
                })
              }
            >
              Delete
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {passage && (
            <Card className="mb-3 border-info">
              <Card.Header className="bg-light">
                <strong>{passage.title}</strong>
              </Card.Header>
              <Card.Body>
                <p className="text-justify" style={{ whiteSpace: "pre-line" }}>
                  {passage.passageContent}
                </p>
              </Card.Body>
            </Card>
          )}

          <ListGroup variant="flush">
            {group.questionTypeDto.questions.map((q, i) => (
              <ListGroup.Item key={q.id} className="border-0 px-0">
                <div className="d-flex align-items-start">
                  <span className="me-2 fw-bold text-primary">{q.id}.</span>
                  <div className="flex-grow-1">
                    <p className="mb-2">{q.questionText}</p>
                    <div className="ps-3">
                      {q.options?.map((opt) => (
                        <Form.Check
                          key={opt.id}
                          type="checkbox"
                          label={opt.optionText}
                          name={`reading-${q.id}`}
                          disabled
                          checked={opt.correctAnswer}
                          className={
                            opt.correctAnswer
                              ? "text-success fw-bold"
                              : "text-muted"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };
  const renderListening = (group) => {
    const { questionTypeDto, listeningPassageDto } = group;
    const isLong = listeningPassageDto?.passage_type == "long";
    return (
      <Card className="mb-4 shadow-sm border-primary">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <strong>{questionTypeDto.name}</strong>
            <Badge bg="light" text="dark" className="ms-2">
              LISTENING {isLong ? "LONG" : "SHORT"}
            </Badge>
          </div>
        </Card.Header>

        <Card.Body>
          {isLong && listeningPassageDto?.scriptText && (
            <Alert variant="info" className="mb-4">
              <Button
                size="sm"
                variant="outline-primary"
                className="ms-3"
                onClick={() =>
                  speak(listeningPassageDto.scriptText, "en-US", 0.9)
                }
              >
                Play Script
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                className="ms-1"
                onClick={stopSpeaking}
              >
                Stop
              </Button>
              <pre
                className="mt-3"
                style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
              >
                {listeningPassageDto.scriptText}
              </pre>
            </Alert>
          )}

          <ListGroup variant="flush">
            {questionTypeDto.questions.map((q, idx) => (
              <ListGroup.Item key={q.id} className="px-0">
                <div className="d-flex align-items-start">
                  <span className="fw-bold text-primary me-2">{idx + 1}.</span>
                  <div className="flex-grow-1">
                    <div className="mb-2">
                      {!isLong && (
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={() => speak(q.listeningText, "en-US", 1)}
                        >
                          Play
                        </Button>
                      )}
                      <span className="ms-2 text-muted small">
                        {q.questionText}
                      </span>
                    </div>
                    {isLong && q.options ? (
                      <div className="ps-3">
                        {q.options.map((opt) => (
                          <Form.Check
                            key={opt.id}
                            type="radio"
                            label={opt.optionText}
                            disabled
                            checked={opt.correctAnswer}
                            className={
                              opt.correctAnswer
                                ? "text-success fw-bold"
                                : "text-muted"
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <Alert
                        variant="light"
                        className="small py-1 px-2 d-inline-block"
                      >
                        <strong>Đáp án:</strong>{" "}
                        {q.correctAnswer || "(Chưa có)"}
                      </Alert>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };
  const renderWriting = (question, index) => {
    return (
      <ListGroup.Item key={question.id} className="border-0 px-0">
        <div className="d-flex align-items-start">
          <span className="me-2 fw-bold text-primary">{index}.</span>
          <div className="flex-grow-1">
            <p className="mb-2">{question.questionText}</p>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Viết câu trả lời ở đây..."
              disabled
            />
            <small className="text-muted">* Chủ đề viết</small>
          </div>
        </div>
      </ListGroup.Item>
    );
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Card
        className={`mb-4 shadow-sm border-0
        `}
      >
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between">
            <strong>Câu hỏi trong bài {isExam ? "kiểm tra" : "học"}</strong>
            <Button
              variant="dark"
              onClick={() =>
                navigate(`/teacher/exam/${id}/addQuestion?mode=exam`)
              }
            >
              {isExam ? "Thêm câu hỏi" : ""}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {questionGroups?.length > 0 ? (
            questionGroups?.map((group, groupIndex) => {
              const { questionTypeDto, readingDto } = group;
              const { type, name, questions } = questionTypeDto;
              if (type === "reading") {
                return renderReading(group, groupIndex);
              }

              return (
                <Card
                  key={questionTypeDto.questionTypeId}
                  className="mb-4 shadow-sm"
                >
                  <Card.Header className="bg-secondary text-white d-flex justify-content-between align-items-center">
                    <div>
                      <strong>
                        {name} ({questions?.length})
                      </strong>
                      <Badge bg="light" text="dark" className="ms-2">
                        {type?.toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <Button
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          handleEdit(group.questionTypeDto.questionTypeId)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          handleDeleteGroup({
                            id: questionTypeDto.questionTypeId,
                            listeningId: group?.listeningPassageDto?.id
                              ? group.listeningPassageDto?.id
                              : null,
                          })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {type === "listening"
                        ? renderListening(group)
                        : type === "reading"
                        ? renderReading(group)
                        : questions.map((q, index) => {
                            const questionNumber = 1 + index;

                            if (type === "fill") {
                              return renderFillInTheBlank(q, questionNumber);
                            }
                            if (type === "mc") {
                              return renderMultipleChoice(q, questionNumber);
                            }
                            if (type === "writing") {
                              return renderWriting(q, questionNumber);
                            }
                            return null;
                          })}
                    </ListGroup>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <p className="text-center text-muted py-4">Chưa có câu hỏi nào.</p>
          )}
        </Card.Body>
      </Card>
      <Modal show={confirm} onHide={handleClose}>
        <Modal.Body>
          <p>Do you want to delete this partType.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button
            onClick={async () => {
              try {
                console.log(deleted);
                await teacherService.deleteListQuestionByQuestionType(
                  deleted.id
                );
                if (deleted.readingId != null) {
                  await teacherService.deleteReadingPassage(deleted.readingId);
                }
                if (deleted.listeningId != null) {
                  await teacherService.deletedListeningPassage(
                    deleted.listeningId
                  );
                }
                toast.success("Xóa thành công");

                setRender(!render);
                handleClose();
              } catch (error) {
                console.error("Lỗi khi xóa từ vựng:", error);
              }
            }}
            variant="danger"
          >
            Delete{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      {showEdit && (
        <EditQuestionModal
          show={showEdit}
          item={editingGroup}
          isExam={isExam}
          setShowEdit={setShowEdit}
          speak={speak}
          onSave={() => setRender(!render)}
        ></EditQuestionModal>
      )}
    </div>
  );
};

export default QuestionDetail;
