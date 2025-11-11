import Item from "antd/es/list/Item";
import React, { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Modal } from "antd";
import teacherService from "../services/TeacherSerivceApi";
import { ca } from "zod/v4/locales";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const AddVocab = () => {
  let { id } = useParams();
  const initialRowDefault = {
    englishWord: "",
    wordType: "",
    vietnameseMeaning: "",
    pronunciation: "",
    lessonId: id,
  };
  const [isModalOpenImport, setIsModalOpenImport] = useState(false);

  const [file, setFile] = useState(null);

  const showModalImport = () => {
    setIsModalOpenImport(true);
  };

  const handleOkImport = async () => {
    if (file) {
      try {
        let res = await teacherService.importVocab(file, id);
        console.log("File uploaded successfully:", res);
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }
    setIsModalOpenImport(false);
  };

  const handleCancelImport = () => {
    setIsModalOpenImport(false);
  };
  const [initailaRow, setInitialRow] = useState({ ...initialRowDefault });
  const [newword, setNewword] = useState([initialRowDefault]);
  const [submited, setsubmited] = useState(false);
  const handleAddRow = () => {
    let newList = [...newword];
    newList.push(initialRowDefault);
    console.log(newList);
    setNewword(newList);
  };

  console.log(newword);

  const handleDeleteRow = (row) => {
    const list = [...newword];
    list.splice(row, 1);
    setNewword(list);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    const list = newword.map((item) => ({ ...item }));

    list[index][name] = value;

    setNewword(list);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setsubmited(true);
    const isAnyFieldEmpty = newword.some(
      (word) =>
        !word.englishWord.trim() ||
        !word.vietnameseMeaning.trim() ||
        !word.pronunciation ||
        !word.wordType
    );

    if (isAnyFieldEmpty) {
      toast.error("Vui lòng điền đầy đủ các trường");
      return;
    }
    await teacherService.createVocab(newword);
    setNewword([]);
    toast.success("Add vocab success");
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Row className="mb-4 align-items-center border-bottom pb-2">
        <Col md={4}>
          <h2 className="text-primary">Thêm Từ Mới</h2>
        </Col>
        <Col md={8} className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            ← Quay về
          </Button>

          <Button variant="info" onClick={showModalImport}>
            Import từ Excel
          </Button>

          <Button variant="success" onClick={handleAddRow}>
            + Thêm Hàng
          </Button>
        </Col>

        <Modal
          title="Import Từ Vựng"
          closable={true}
          open={isModalOpenImport}
          onOk={handleOkImport}
          onCancel={handleCancelImport}
        >
          <input
            type="file"
            className="form-control mt-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Modal>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>English Word</th>
            <th>Type</th>
            <th>Meaning</th>
            <th>Pronounciation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {newword.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="englishWord"
                    value={item.englishWord}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="wordType"
                    onChange={(e) => handleInputChange(index, e)}
                    value={item.wordType}
                  />
                </td>{" "}
                <td>
                  <input
                    type="text"
                    name="vietnameseMeaning"
                    onChange={(e) => handleInputChange(index, e)}
                    value={item.vietnameseMeaning}
                  />
                </td>{" "}
                <td>
                  <input
                    type="text"
                    name="pronunciation"
                    onChange={(e) => handleInputChange(index, e)}
                    value={item.pronunciation}
                  />
                </td>{" "}
                <td>
                  <button
                    className="border border-none"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <button
          type="submit"
          onClick={() => handleSubmit()}
          className="border mt-3 bg-primary text-light py-3 border-none"
        >
          Submit
        </button>
      </Table>
    </div>
  );
};

export default AddVocab;
