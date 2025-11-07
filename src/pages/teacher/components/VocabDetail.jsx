import React, { useEffect, useState } from "react";
import { Card, Modal, Button, Table } from "react-bootstrap";
import teacherService from "../services/TeacherSerivceApi";
import AddGrammarModal from "./AddGrammarModal";
import EditVocabModal from "./EditVocab";
import { toast } from "react-toastify";

const VocabDetail = ({ id }) => {
  const [render, setRender] = useState(false);

  const [showAddGrammar, setShowAddGrammar] = useState(false);

  const [idDelete, setIdDelete] = useState();

  const [showNotification, setShowNotification] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [updateVocab, setUpdateVocab] = useState();
  const handleClose = () => {
    setShowNotification(false);
  };
  const [vocabList, setVocabList] = useState([]);
  useEffect(() => {
    async function fetchListVocabary() {
      teacherService.getVocabByLessonId(id).then((data) => setVocabList(data));
    }
    fetchListVocabary();
  }, [render]);
  const handleDelete = (id) => {
    setIdDelete(id);
    setShowNotification(true);
  };
  console.log(vocabList);

  return (
    <div>
      <Card className={`mb-4 shadow-sm border-0 `}>
        {" "}
        <Card.Header className="bg-info text-white">
          <strong>Vocabulary ({vocabList.length})</strong>
        </Card.Header>
        <Card.Body>
          {vocabList ? (
            <Table>
              <thead>
                <tr>
                  <th className="" style={{ width: "40px" }}>
                    STT
                  </th>
                  <th>Từ vựng</th>
                  <th>Từ loại</th>
                  <th>Nghĩa</th>
                  <th>Phát âm</th>
                  <th>Ví dụ</th>
                  <th className="" style={{ width: "80px" }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {vocabList?.map((item, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <th>{item.englishWord}</th>
                    <th>{item.wordType}</th>
                    <th>{item.vietnameseMeaning}</th>
                    <th>{item.pronunciation}</th>
                    <th>{item.exampleSample} </th>
                    <th>
                      <i
                        className="bi bi-pencil"
                        onClick={() => {
                          setShowEdit(true);
                          setUpdateVocab(item);
                        }}
                      ></i>
                      <i
                        className="bi bi-trash"
                        onClick={() => handleDelete(item)}
                      ></i>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">Chưa có từ vựng nào.</p>
          )}
        </Card.Body>
      </Card>
      <Modal show={showNotification} onHide={handleClose}>
        <Modal.Body>
          <p>Do you want to delete {idDelete?.englishWord}.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button
            onClick={async () => {
              try {
                await teacherService.deleteVocab(idDelete?.id);
                toast.success("Xóa thành công");
                setRender(!render);
                setShowNotification(false);
              } catch (error) {
                console.error("Lỗi khi xóa từ vựng:", error);
              }
            }}
            variant="primary"
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      <AddGrammarModal
        showGrammar={showAddGrammar}
        handleClose={() => setShowAddGrammar(false)}
      ></AddGrammarModal>
      <EditVocabModal
        show={showEdit}
        setShowEdit={setShowEdit}
        vocabData={updateVocab}
        onSave={() => setRender(!render)}
      ></EditVocabModal>
    </div>
  );
};

export default VocabDetail;
