import Item from "antd/es/list/Item";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Modal } from "antd";
import teacherService from "../services/TeacherSerivceApi";
import { ca } from "zod/v4/locales";
import { useParams } from "react-router";

const initialRowDefault = {
  EnglishWord: "",
  type: "",
  vietnamese: "",
  pnonounciation: "",
  example: "",
};
const AddVocab = () => {
  let { id } = useParams();
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
  const handleSubmit = () => {
    console.log("List check:", newword);
    setsubmited(true);
    const isAnyFieldEmpty = newword.some(
      (word) =>
        !word.EnglishWord.trim() ||
        !word.vietnamese.trim() ||
        !word.pnonounciation ||
        !word.example ||
        !word.type
    );

    if (isAnyFieldEmpty) {
      alert(
        "VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN: Không được để trống bất kỳ ô nào."
      );
      return;
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between mb-3 mx-1 mt-2">
        <h2>New Vocabulary</h2>
        <Button type="primary" onClick={showModalImport}>
          Import from Excel
        </Button>
        <Modal
          title="Basic Modal"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpenImport}
          onOk={handleOkImport}
          onCancel={handleCancelImport}
        >
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Modal>
        <Button
          onClick={() => handleAddRow()}
          className="border border-none  bg-primary"
        >
          Create new{" "}
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>English Word</th>
            <th>Type</th>
            <th>Meaning</th>
            <th>Pronounciation</th>
            <th>Example</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {newword.map((item, index) => {
            const englishIsInvalid = !item.EnglishWord.trim();
            const vietnameseIsInvalid = !item.vietnamese.trim();
            const pronounciationIsInvalid = !item.pnonounciation.trim();
            const typeIsInvalid = !item.type.trim();
            const exampleInvalid = !item.example.trim();
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <input
                    className={englishIsInvalid && submited ? "bg-danger" : ""}
                    type="text"
                    name="EnglishWord"
                    // value={item.EnglishWord}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    className={typeIsInvalid && submited ? "bg-danger" : ""}
                    type="text"
                    name="type"
                    onChange={(e) => handleInputChange(index, e)}
                    // value={item.type}
                  />
                </td>{" "}
                <td>
                  <input
                    type="text"
                    className={
                      vietnameseIsInvalid && submited ? "bg-danger" : ""
                    }
                    name="vietnamese"
                    onChange={(e) => handleInputChange(index, e)}
                    // value={item.vietnamese}
                  />
                </td>{" "}
                <td>
                  <input
                    className={
                      pronounciationIsInvalid && submited ? "bg-danger" : ""
                    }
                    type="text"
                    name="pnonounciation"
                    onChange={(e) => handleInputChange(index, e)}
                    // value={item.pnonounciation}
                  />
                </td>{" "}
                <td>
                  <input
                    type="text"
                    className={exampleInvalid && submited ? "bg-danger" : ""}
                    name="example"
                    onChange={(e) => handleInputChange(index, e)}
                    // value={item.example}
                  />
                </td>
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
