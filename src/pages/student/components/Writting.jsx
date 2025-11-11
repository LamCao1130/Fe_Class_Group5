import React, { useEffect, useState } from "react";
import ExerciseNavBar from "./ExerciseNavBar";
import HeaderCLassStudent from "./HeaderCLassStudent";
import { useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export default function Writting() {
  const { lessonId } = useParams();
  const [listWrite, setListWrite] = useState([]);
  const [aiResult, setAiResult] = useState();

  const [loading, setLoading] = useState(false);
  let [aiCheckWrite, setAicheckWrite] = useState({});
  let [totalWrite, setTotalWrite] = useState();

  let [dataSubmit, setDataSubmit] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function callEx() {
      let dataWritting = { lessonId: lessonId, type: "writing" };
      let resWrite = await studentApi.getListQuestionType(dataWritting);
      const total = resWrite.flatMap((item) => item.questions).length;
      setTotalWrite(total);
      setListWrite(resWrite);
      console.log(resWrite);
    }
    callEx();
  }, []);
  return (
    <>
      <HeaderCLassStudent />
      <ExerciseNavBar />
      <ToastContainer position="top-right" autoClose={3000} />
      {listWrite?.map((item) => {
        return (
          <>
            {item.questions.map((q, index) => {
              return (
                <>
                  <Card style={{ marginTop: "30px" }}>
                    <Card.Title>{q.questionText}</Card.Title>
                    <Card.Body>
                      <textarea
                        className="form-control"
                        style={{ height: "180px" }}
                        onChange={(e) => {
                          setAicheckWrite({
                            ...aiCheckWrite,
                            [q.id]: e.target.value,
                          });
                          setDataSubmit((pre) => {
                            const clone = [...pre];
                            clone[index] = {
                              ...clone[index],
                              question: e.target.value,
                            };
                            return clone;
                          });
                        }}
                      ></textarea>
                      <Button
                        variant="outline-info"
                        style={{ margin: "30px" }}
                        onClick={async () => {
                          const essay = aiCheckWrite[q.id];
                          if (!essay) {
                            toast.error("Đoạn văn đang trống");
                          } else {
                            setLoading(true);
                            let dataCheck = {
                              question: `Hãy kiểm tra cho tôi với đề bài ${q.questionText} thì đoạn văn của tôi còn vấn đề gì? ${essay} `,
                            };
                            try {
                              let resAi = await studentApi.getAIAnswerWritting(
                                dataCheck
                              );
                              setAiResult(resAi);
                              handleShow();
                            } catch (e) {
                              toast.error("call Ai lỗi");
                            } finally {
                              setLoading(false);
                            }
                          }
                        }}
                      >
                        {loading ? "Đang kiểm tra..." : "Check AI"}
                      </Button>
                    </Card.Body>
                  </Card>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Đóng góp từ AI</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{aiResult}</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              );
            })}
          </>
        );
      })}
      <Button
        style={{ margin: "30px" }}
        onClick={async () => {
          console.log(dataSubmit);
          const hasEmpty = dataSubmit.some(
            (item) =>
              !item.question ||
              item.question.trim() === "" ||
              item.question === undefined
          );
          if (
            hasEmpty ||
            dataSubmit.length === 0 ||
            dataSubmit.length < totalWrite
          ) {
            toast.error("không thể nộp bài trống");
          } else {
            try {
              let res = await studentApi.submitWritting(dataSubmit, lessonId);
              toast.success("nộp bài thành công");
            } catch {
              toast.error("fail");
            }
          }
        }}
      >
        Nộp bài
      </Button>
    </>
  );
}
