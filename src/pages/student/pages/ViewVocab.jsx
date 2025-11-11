import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card, Table } from "react-bootstrap";
import { tr } from "zod/v4/locales";
import { CiVolumeHigh } from "react-icons/ci";

export default function ViewVocab() {
  const { lessionId } = useParams();
  const [listVocab, setListVocab] = useState();
  const [title, setTitle] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let callVocab = async () => {
      let resVoc = await studentApi.getVocabList(lessionId);
      let resDetail = await studentApi.getDetailLesson(lessionId);
      console.log(resVoc);
      console.log(resDetail);
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
      </div>
    </>
  );
}
