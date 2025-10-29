import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddGrammarModal = ({ showGrammar, handleClose }) => {
  const [newGrammar, setNewGrammar] = useState({
    title: "",
    explanation: "",
    structure: "",
    examples: "",
    usageNotes: "",
  });
  return (
    <div>
      <Modal show={showGrammar} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Ngữ pháp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="VD: Present Simple"
                value={newGrammar.title}
                onChange={(e) =>
                  setNewGrammar({ ...newGrammar, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giải thích</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Dùng để nói về thói quen..."
                value={newGrammar.explanation}
                onChange={(e) =>
                  setNewGrammar({ ...newGrammar, explanation: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cấu trúc</Form.Label>
              <Form.Control
                type="text"
                placeholder="S + V(s/es)"
                value={newGrammar.structure}
                onChange={(e) =>
                  setNewGrammar({ ...newGrammar, structure: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ví dụ</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="I go to school every day."
                value={newGrammar.examples}
                onChange={(e) =>
                  setNewGrammar({ ...newGrammar, examples: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Dùng với: always, usually, never..."
                value={newGrammar.usageNotes}
                onChange={(e) =>
                  setNewGrammar({ ...newGrammar, usageNotes: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGrammar(false)}>
            Hủy
          </Button>
          <Button
            variant="primary"
            disabled={
              !newGrammar.title ||
              !newGrammar.explanation ||
              !newGrammar.structure
            }
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddGrammarModal;
