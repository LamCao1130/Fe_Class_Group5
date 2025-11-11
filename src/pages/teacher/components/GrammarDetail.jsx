import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";
import { toast, ToastContainer } from "react-toastify";
import AddGrammarModal from "./AddGrammarModal";

const GrammarDetail = ({ id }) => {
  const [grammarList, setGrammarList] = useState([]);
  const [deleted, setDetleted] = useState();
  const [showDelted, setShowDeleted] = useState(false);
  const [render, setRender] = useState(false);
  const [showEditGrammar, setshowEditGrammar] = useState(false);
  const [update, setUpdate] = useState();
  const [message, setMessage] = useState({
    message: "",
    type: "",
  });
  useEffect(() => {
    async function fetchListGrammar() {
      teacherService
        .getGrammrByLessonId(id)
        .then((data) => setGrammarList(data));
    }
    fetchListGrammar();
  }, [render]);
  const handleDelete = async (g) => {
    setShowDeleted(true);
    setDetleted(g);
  };

  const handleUpdate = (i) => {
    console.log(i);
    setUpdate(i);
    setshowEditGrammar(true);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

      <Card className={`mb-4 shadow-sm border-0 `}>
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
                  <div>
                    <Button
                      className="me-4"
                      size="sm"
                      variant="outline-light"
                      onClick={() => handleDelete(g)}
                    >
                      <i class="bi bi-trash"></i>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-light"
                      onClick={() => handleUpdate(g.id)}
                    >
                      <i class="bi bi-pencil"></i>
                    </Button>
                  </div>
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
                            <strong className="text-success">{label}:</strong>{" "}
                            <span>{sentence}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h6 className="text-primary fw-bold">Ghi chú sử dụng</h6>
                    <ul className="list-unstyled mb-0">
                      {g.usageNotes.split("\n").map((note, i) => {
                        const [title, detail] = note.split(" (");
                        const cleanDetail = detail ? `(${detail}` : "";
                        return (
                          <li key={i} className="mb-1">
                            <strong>{title}</strong>{" "}
                            <span className="text-muted">{cleanDetail}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted py-4">Chưa có ngữ pháp nào.</p>
          )}
        </Card.Body>
      </Card>
      <Modal show={showDelted} handleClose={() => setShowDeleted(false)}>
        <Modal.Body>
          <p>Do you want to delete {deleted?.title}.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShowDeleted(false)} variant="secondary">
            Close
          </Button>
          <Button
            onClick={async () => {
              try {
                await teacherService.deleteGrammar(deleted?.id);
                toast.success("Xóa thành công");
                setRender(!render);
                setShowDeleted(false);
              } catch (error) {
                toast.error("Lỗi khi xóa ngữ pháp", error);
              }
            }}
            variant="danger"
          >
            Deleted{" "}
          </Button>
        </Modal.Footer>
      </Modal>

      <AddGrammarModal
        showGrammar={showEditGrammar}
        type={"Chỉnh sửa"}
        update={update}
        handleClose={() => setshowEditGrammar(false)}
        onSave={() => setRender(!render)}
      ></AddGrammarModal>
    </div>
  );
};

export default GrammarDetail;
