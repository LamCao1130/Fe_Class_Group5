import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";
import { toast, ToastContainer } from "react-toastify";

const EditVocabModal = ({ show, handleClose, vocabData, onSave }) => {
  const [formData, setFormData] = useState(vocabData);
  const [errors, setErrors] = useState({});
  const [englishChange, setEnglishChange] = useState();
  const validateForm = (data) => {
    const errors = {};

    if (!data.englishWord || data.englishWord.trim() === "") {
      errors.vocab = "Từ vựng không được để trống.";
    }

    if (!data.vietnameseMeaning || data.vietnameseMeaning.trim() === "") {
      errors.meaning = "Nghĩa không được để trống.";
    }

    if (!data.wordType) {
      errors.wordType = "Vui lòng chọn Từ loại.";
    }

    return errors;
  };
  useEffect(() => {
    setFormData(vocabData);
    setEnglishChange(vocabData?.englishWord);
  }, [vocabData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const validationError = validateForm(formData);
      if (Object.keys(validationError).length != 0) {
        console.log(Object.keys(validationError).length);
        toast.error("Vui lòng điền đầy đủ thông tin các trường");
        return;
      }
      await teacherService.editVocab(formData);
      onSave();
      toast.success("Chỉnh sửa thành công");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Modal.Header closeButton>
        <Modal.Title>Update English word : {englishChange}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>English Word</Form.Label>
            <Form.Control
              type="text"
              name="englishWord"
              value={formData.englishWord || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>English Type</Form.Label>
            <Form.Select
              name="wordType"
              value={formData.wordType || ""}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Noun">Noun</option>
              <option value="Verb">Verb</option>
              <option value="Adjective">Adjective</option>
              <option value="Adverb">Adverb</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vietnamese Meaning</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="vietnameseMeaning"
              value={formData.vietnameseMeaning || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pronunciation</Form.Label>
            <Form.Control
              type="text"
              name="pronunciation"
              value={formData.pronunciation || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVocabModal;
