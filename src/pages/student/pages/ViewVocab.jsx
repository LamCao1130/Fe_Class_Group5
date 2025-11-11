import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card, Modal, Table } from "react-bootstrap";
import { tr } from "zod/v4/locales";
import { CiVolumeHigh } from "react-icons/ci";

export default function ViewVocab() {
  const { lessionId } = useParams();
  const [listVocab, setListVocab] = useState();
  const [title, setTitle] = useState();
  const [listGrammar, setListGrammar] = useState();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let callVocab = async () => {
      let resVoc = await studentApi.getVocabList(lessionId);
      let resDetail = await studentApi.getDetailLesson(lessionId);
      let resGrammar = await studentApi.getGrammarByLesson(lessionId);
      console.log(resDetail);
      setListGrammar(resGrammar);
      setTitle(resDetail);
      setListVocab(resVoc);
    };
    callVocab();
  }, []);
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };
  let raw = title?.homeworkAttachmentUrl || "";
  let url = null;

  if (raw.includes("https://youtu.be/")) {
    url = raw.replace("https://youtu.be/", "https://www.youtube.com/embed/");
  }

  if (raw.includes("https://www.youtube.com/watch?v=")) {
    url = raw.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    );
  }
  return (
    <>
      <div className="mt-3">
        <Button
          variant="success"
          onClick={() => {
            navigate("/student/doExercise/" + lessionId + "/mcAndFill");
          }}
        >
          Làm bài tập
        </Button>
        <Button
          className="ms-3"
          variant="success"
          onClick={() => {
            navigate("/student/history/" + lessionId);
          }}
        >
          Lịch sử làm bài
        </Button>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>{title?.title}</h1>
        <Card style={{ marginTop: "30px" }}>
          <Card.Title>📖 Từ vựng</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Từ vựng</th>
                  <th>Phiên âm</th>
                  <th>Nghĩa</th>
                  <th>Phát âm</th>
                </tr>
              </thead>
              <tbody>
                {listVocab?.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.englishWord}</td>
                        <td>{item.pronunciation}</td>
                        <td>{item.vietnameseMeaning}</td>
                        <td>
                          <CiVolumeHigh
                            onClick={() => speak(item.englishWord)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card style={{ marginTop: "30px" }}>
          <Card.Title>💡 Ngữ pháp</Card.Title>
          <Card.Body>
            {listGrammar?.map((item) => {
              return (
                <>
                  <Card>
                    <Card.Title style={{ color: "red" }}>
                      {item.title}
                    </Card.Title>
                    <Card.Body>
                      <h4>Giải thích:</h4>
                      <Card.Text>{item.explanation}</Card.Text>
                      <h4>Cấu trúc:</h4>
                      <Card.Text>{item.structure}</Card.Text>
                      <h4>Ví dụ:</h4>
                      <Card.Text>{item.examples}</Card.Text>
                    </Card.Body>
                  </Card>
                </>
              );
            })}
          </Card.Body>
        </Card>

        <Button
          style={{ margin: "30px" }}
          variant="warning"
          onClick={handleShow}
        >
          Xem record
        </Button>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* https://youtu.be/K4GOEIQicU0?si=F0eewrAS66L0iQOl */}
            {url ? (
              <iframe
                width="100%"
                height="315"
                src={url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            ) : (
              "Không có bản ghi nào"
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
