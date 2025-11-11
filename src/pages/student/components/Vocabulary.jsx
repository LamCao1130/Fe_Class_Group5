import React, { useEffect, useState } from "react";
import ExerciseNavBar from "./ExerciseNavBar";
import { useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card, Modal } from "react-bootstrap";
import { Key } from "lucide-react";
import HeaderCLassStudent from "./HeaderCLassStudent";

export default function Vocabulary() {
  const { lessonId } = useParams();
  const [listMc, setListMc] = useState([]);
  const [listFill, setListFill] = useState([]);
  const [answers, setAnswers] = useState([]);
  let [reRender, setReRender] = useState(true);
  let [resultFail, setResultFail] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function callEx() {
      let dataMc = { lessonId: lessonId, type: "mc" };
      let dataFill = { lessonId: lessonId, type: "fill" };
      console.log(dataMc, dataFill);
      let resExMc = await studentApi.getListQuestionType(dataMc);
      let resExFill = await studentApi.getListQuestionType(dataFill);
      console.log(resExFill);
      console.log(resExMc);
      setListFill(resExFill);
      setListMc(resExMc);
    }
    callEx();
  }, [reRender]);
  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);

      if (existing) {
        const alreadySelected = existing.selected.includes(optionId);
        const updatedSelected = alreadySelected
          ? existing.selected.filter((id) => id !== optionId) // bỏ chọn
          : [...existing.selected, optionId]; // thêm chọn

        // Cập nhật lại trong mảng
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selected: updatedSelected } : a
        );
      } else {
        // Nếu câu hỏi chưa có trong state thì thêm mới
        return [...prev, { questionId, selected: [optionId] }];
      }
    });
  };

  const handleTextChange = (questionId, text) => {
    setAnswers((prev) => {
      const exist = prev.find((a) => a.questionId === questionId);

      if (exist) {
        // update phần tử đã có
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, textAnswer: text } : a
        );
      } else {
        // thêm mới nếu chưa có
        return [...prev, { questionId, textAnswer: text }];
      }
    });
  };
  if (listFill.length === 0 && listMc.length === 0) {
    return (
      <>
        <HeaderCLassStudent />
        <ExerciseNavBar />
        <h3>Không có bài tập</h3>
      </>
    );
  } else {
    return (
      <>
        <HeaderCLassStudent />
        <ExerciseNavBar />

        <div>
          {listFill.map((item) => {
            return (
              <>
                <Card key={item.id}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Body>
                    {item.questions.map((q, index) => {
                      return (
                        <>
                          <p>
                            {index + 1}
                            {". " + q.questionText}
                          </p>
                          <input
                            type="text"
                            placeholder="Điền đáp án"
                            style={{
                              padding: "15px",
                              border: "1px solid gray",
                              borderRadius: "15px",
                            }}
                            onChange={(e) =>
                              handleTextChange(q.id, e.target.value)
                            }
                          />
                        </>
                      );
                    })}
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </div>
        <div style={{ marginTop: "30px" }}>
          {listMc.map((item) => {
            return (
              <>
                <Card key={item.id}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Body>
                    {item.questions.map((q, index) => {
                      return (
                        <>
                          <p>
                            {index + 1}
                            {". " + q.questionText}
                          </p>
                          {q.options.map((op) => {
                            return (
                              <div style={{ marginLeft: "10px" }}>
                                <input
                                  type="checkbox"
                                  onChange={() => handleSelect(q.id, op.id)}
                                />
                                <span>{op.optionText}</span>
                              </div>
                            );
                          })}
                        </>
                      );
                    })}
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </div>
        <Button
          style={{ margin: "30px" }}
          onClick={async () => {
            try {
              let res = await studentApi.getListFailOptionVocab(
                answers,
                lessonId
              );
              console.log(res);
              setResultFail(res);
              handleShow();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Nộp nài
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Những câu sai</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {resultFail?.map((p) => {
              return (
                <>
                  <p style={{ color: "red" }}>
                    {p.questionText},{" "}
                    <span style={{ color: "green" }}>
                      answer: {p.textTrueAnswer}
                    </span>
                  </p>
                </>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setReRender(!reRender);
                handleClose();
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
