import React, { useEffect, useState } from "react";
import ExerciseNavBar from "./ExerciseNavBar";
import HeaderCLassStudent from "./HeaderCLassStudent";
import { useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card, Modal } from "react-bootstrap";
import { CiVolumeHigh } from "react-icons/ci";

export default function Listening() {
  const { lessonId } = useParams();
  let [dataListenShort, setDataListenShort] = useState();
  let [dataListenLong, setDataListenLong] = useState();
  const [answers, setAnswers] = useState([]);
  let [resultFail, setResultFail] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function callEx() {
      let dataCall = await studentApi.getListListeningByLessonId(lessonId);
      console.log(dataCall);
      let dataShort = dataCall?.filter((p) => p.passage_type === "short");
      let dataLong = dataCall?.filter((p) => p.passage_type === "long");
      setDataListenShort(dataShort);
      setDataListenLong(dataLong);
    }
    callEx();
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

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

  return (
    <>
      <HeaderCLassStudent />
      <ExerciseNavBar />
      <div>
        {dataListenLong?.map((item) => {
          return (
            <>
              <Card style={{ marginTop: "30px" }}>
                <Card.Text>
                  <Button onClick={() => speak(item.scriptText)}>
                    <CiVolumeHigh />
                    Nghe đoạn văn
                  </Button>
                </Card.Text>
                <Card.Body>
                  {item.questions.map((q) => {
                    return (
                      <>
                        <p>{q.questionText}</p>
                        {q.options.map((op) => {
                          return (
                            <>
                              <input
                                type="checkbox"
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
      <div>
        {dataListenShort?.map((item) => {
          return (
            <>
              <Card style={{ marginTop: "30px" }}>
                <Card.Body>
                  {item.questions.map((q) => {
                    return (
                      <>
                        <span>{q.questionText}</span>
                        <Button
                          style={{ marginLeft: "50px" }}
                          onClick={() => speak(q.listeningText)}
                        >
                          <CiVolumeHigh />
                          Nghe
                        </Button>
                        <br />
                        <input
                          type="text"
                          placeholder="Điền đáp án"
                          style={{
                            border: "1px solid gray",
                            borderRadius: "15px",
                            padding: "10px",
                            marginTop: "10px",
                          }}
                          onChange={(e) =>
                            handleTextChange(q.id, e.target.value)
                          }
                        />
                        <br />
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
            let res = await studentApi.getListFailOptionListen(
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
