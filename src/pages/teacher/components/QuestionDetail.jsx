import React, { useEffect, useState } from "react";
import { Card, Button, Badge, ListGroup, Form, Modal } from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import EditQuestionModal from "./EditQuestionModal";

const QuestionDetail = () => {
  const [questionGroups, setQuestionGroups] = useState([]);
  const { id } = useParams();
  const [render, setRender] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState();
  const [editingGroup, setEditingGroup] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteGroup = (questionType) => {
    setConfirm(true);
    setDeleted(questionType);
  };

  const handleEdit = (question) => {
    setEditingGroup(question);
    setShowEdit(true);
  };

  const handleClose = () => {
    setConfirm(false);
  };
  useEffect(() => {
    teacherService.getQuestion(id).then((data) => setQuestionGroups(data));
  }, [render]);
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
            {group.questionTypeDto.name} (
            {group.questionTypeDto.questions?.length})
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
                          type="radio"
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
          <strong>Câu hỏi trong bài học</strong>
        </Card.Header>
        <Card.Body>
          {questionGroups.length > 0 ? (
            questionGroups.map((group, groupIndex) => {
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
                        {name} ({questions.length})
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
                          })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {questions.map((q, index) => {
                        if (type === "fill") {
                          return renderFillInTheBlank(q, 1 + index);
                        } else if (type === "mc") {
                          return renderMultipleChoice(q, 1 + index);
                        } else if (type === "writing") {
                          return renderWriting(q);
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
                await teacherService.deleteListQuestionByQuestionType(
                  deleted.id
                );
                if (deleted.readingId != null) {
                  await teacherService.deleteReadingPassage(deleted.readingId);
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
          setShowEdit={setShowEdit}
          onSave={() => setRender(!render)}
        ></EditQuestionModal>
      )}
    </div>
  );
};

export default QuestionDetail;
