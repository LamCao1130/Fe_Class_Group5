import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Row, Col, Badge } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import teacherService from "../services/TeacherSerivceApi";
import { Plus, Trash3 } from "react-bootstrap-icons";

const EditQuestionModal = ({ show, item, setShowEdit, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!show || !item) {
      setForm(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await teacherService.getQuestionType(item);
        setForm({
          questionTypeId: response.questionTypeDto.questionTypeId,
          name: response.questionTypeDto.name || "",
          type: response.questionTypeDto.type || "",
          lessonId: response.questionTypeDto.lessonId,
          questions: response.questionTypeDto.questions || [],
          readingTitle: response.readingDto?.title || "",
          readingContent: response.readingDto?.passageContent || "",
          readingId: response.readingDto?.id || "",
        });
      } catch (err) {
        toast.error("Lấy dữ liệu thất bại!");
        setShowEdit(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item]);

  if (loading || !form) {
    return (
      <Modal show={show} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center py-5">
          <Spinner animation="border" /> <br />
          Đang tải dữ liệu...
        </Modal.Body>
      </Modal>
    );
  }

  const removeQuestionOption = (qIdx, qOIdx) => {
    setForm((pre) => ({
      ...pre,
      questions: pre.questions.map((q, i) =>
        i == qIdx
          ? { ...q, options: q.options.filter((qo, index) => index != qOIdx) }
          : q
      ),
    }));
  };

  const removeQuestion = (qIdx) => {
    setForm((pre) => ({
      ...pre,
      questions: pre.questions.filter((q, i) => i != qIdx),
    }));
  };

  const handleClose = () => setShowEdit(false);

  const updateQuestion = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === idx ? { ...q, [field]: value } : q
      ),
    }));
  };

  console.log(form);

  const toggleOption = (qIdx, optIdx) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((opt, j) => ({
                ...opt,
                correctAnswer:
                  j === optIdx ? !opt.correctAnswer : opt.correctAnswer,
              })),
            }
          : q
      ),
    }));
  };

  const addMcOption = (qIdx) => {
    setForm((pre) => ({
      ...pre,
      questions: pre.questions.map((q, i) =>
        i != qIdx
          ? q
          : {
              ...q,
              options: [...q.options, { optionText: "", correctAnswer: "" }],
            }
      ),
    }));
  };
  console.log(form);
  const updateOptionText = (qIdx, optIdx, value) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((opt, j) => ({
                ...opt,
                optionText: j === optIdx ? value : opt.optionText,
              })),
            }
          : q
      ),
    }));
  };
  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          questionText: "",
          correctAnswer: "",
          options: [{}],
        },
      ],
    });
  };
  const handleSave = async () => {
    if (!form.name) {
      toast.error("Vui lòng điền đầy đủ tên part");
      return;
    }
    console.log(form.name);

    if (
      form.questions.some((q) => {
        if (!q.questionText) return true;
        if (form.type == "fill") {
          if (!q.correctAnswer) return true;
        }
        if (form.type == "mc" || form.type == "reading") {
          const hasCorrectOption = q.options.some((item) => item.correctAnswer);
          if (q.options.length < 2) {
            return true;
          }
          if (!hasCorrectOption) {
            return true;
          }
        }
      })
    ) {
      toast.error("Vui lòng đầy đủ thông tin của question");
      return;
    }

    if (form.type == "reading") {
      if (!form.readingContent || !form.readingTitle) {
        toast.error("Vui lòng điền đầy đủ thông tin reading");
        return;
      }
    }
    setSaving(true);

    try {
      const payload = {
        questionTypeDto: {
          questionTypeId: form.questionTypeId,
          name: form.name,
          type: form.type,
          lessonId: form.lessonId,
          questions: form.questions.map((q) => ({
            id: q.id,
            questionText: q.questionText,
            correctAnswer: q.correctAnswer || "",
            options: q.options || null,
          })),
        },
        readingDto:
          form.type === "reading"
            ? {
                id: form.readingId,
                title: form.readingTitle,
                passageContent: form.readingContent,
              }
            : null,
      };

      await teacherService.updateQuestionType(payload);
      toast.success("Cập nhật thành công!");
      onSave();
      handleClose();
    } catch (err) {
      toast.error("Lưu thất bại!");
    } finally {
      setSaving(false);
    }
  };

  const isReading = form.type === "reading";
  const isMc = form.type == "mc";
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={!saving}>
          <Modal.Title>
            Chỉnh sửa phần: <strong>{form.name}</strong>
            <Badge bg="info" className="ms-2">
              {form.type.toUpperCase()}
            </Badge>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Tên phần</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Loại</Form.Label>
              <Form.Select value={form.type} disabled>
                <option value="mc">Multiple Choice</option>
                <option value="fill">Fill in the blank</option>
                <option value="reading">Reading</option>
                <option value="writing">Writing</option>
              </Form.Select>
            </Col>
          </Row>

          {isReading && (
            <div className="border rounded p-4 bg-light mb-4">
              <h5>Đoạn văn Reading</h5>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  value={form.readingTitle}
                  onChange={(e) =>
                    setForm({ ...form, readingTitle: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={form.readingContent}
                  onChange={(e) =>
                    setForm({ ...form, readingContent: e.target.value })
                  }
                />
              </Form.Group>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <h5>Câu hỏi ({form.questions.length})</h5>

            <Button
              className="mb-3"
              variant="outline-primary"
              onClick={addQuestion}
            >
              <Plus /> Thêm câu hỏi
            </Button>
          </div>
          {form.questions.map((q, qIdx) => (
            <div
              key={q.id}
              className="border rounded p-4 mb-4 bg-white shadow-sm"
            >
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between mb-3">
                  <Form.Label className="fw-bold">Câu {qIdx + 1}</Form.Label>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => removeQuestion(qIdx)}
                  >
                    <Trash3 />
                  </Button>
                </div>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={q.questionText || ""}
                  onChange={(e) =>
                    updateQuestion(qIdx, "questionText", e.target.value)
                  }
                />
              </Form.Group>

              {isReading || isMc ? (
                <div>
                  <div className="d-flex justify-content-between">
                    <Form.Label className="fw-bold">
                      Đáp án (có thể chọn nhiều)
                    </Form.Label>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => addMcOption(qIdx)}
                    >
                      <Plus /> Thêm đáp án
                    </Button>
                  </div>
                  {q.options.map((opt, optIdx) => (
                    <Row key={optIdx} className="mb-2 align-items-center">
                      <Col xs={8}>
                        <Form.Control
                          value={opt.optionText || ""}
                          onChange={(e) =>
                            updateOptionText(qIdx, optIdx, e.target.value)
                          }
                          placeholder={`Đáp án ${String.fromCharCode(
                            65 + optIdx
                          )}`}
                        />
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex justify-content-around mt-2">
                          {" "}
                          <Form.Check
                            type="checkbox"
                            label="Đúng"
                            checked={opt.correctAnswer || false}
                            onChange={() => toggleOption(qIdx, optIdx)}
                          />
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => removeQuestionOption(qIdx, optIdx)}
                          >
                            <Trash3 />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </div>
              ) : (
                <Form.Group>
                  <Form.Label>Đáp án đúng</Form.Label>
                  <Form.Control
                    value={q.correctAnswer || ""}
                    onChange={(e) =>
                      updateQuestion(qIdx, "correctAnswer", e.target.value)
                    }
                    placeholder="went / has gone / ..."
                  />
                </Form.Group>
              )}
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={saving}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Spinner size="sm" className="me-2" />
                Đang lưu...
              </>
            ) : (
              "Lưu toàn bộ"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditQuestionModal;
