import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";

const GrammarDetail = ({ id }) => {
  const [grammarList, setGrammarList] = useState([]);
  useEffect(() => {
    async function fetchListGrammar() {
      teacherService
        .getGrammrByLessonId(id)
        .then((data) => setGrammarList(data));
    }
    fetchListGrammar();
  }, []);
  return (
    <div>
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
    </div>
  );
};

export default GrammarDetail;
