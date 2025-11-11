import React, { useEffect, useState } from "react";
import ExerciseNavBar from "./ExerciseNavBar";
import HeaderCLassStudent from "./HeaderCLassStudent";
import studentApi from "../studentApi/studentApi";
import { useParams } from "react-router";
import { Button, Card, Modal } from "react-bootstrap";

export default function Reading() {
  const { lessonId } = useParams();
  let [dataReading, setDataReading] = useState([]);

  const [answers, setAnswers] = useState([]);
  let [resultFail, setResultFail] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function callEx() {
      let dataCall = await studentApi.getListReadingByLessonId(lessonId);
      console.log(dataCall);
      setDataReading(dataCall);
    }
    callEx();
  }, []);

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

  if (dataReading.length === 0) {
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
        <div>
          <HeaderCLassStudent />
          <ExerciseNavBar />
          {dataReading?.map((item) => {
            return (
              <>
                <Card style={{ marginTop: "30px" }}>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Body>
                    <Card.Text>{item.passageContent}</Card.Text>
                    {item.questions.map((q) => {
                      return (
                        <>
                          <p>{q.questionText}</p>
                          {q.options.map((op) => {
                            return (
                              <>
                                <input
                                  type="checkbox"
                                  name=""
                                  id=""
                                  onChange={() => handleSelect(q.id, op.id)}
                                />
                                <span>{op.optionText}</span>
                                <br />
                              </>
                            );
                          })}
                          <br />
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
            console.log(answers);
            try {
              let res = await studentApi.getListFailOptionReading(
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
