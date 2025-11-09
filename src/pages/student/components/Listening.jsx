import React, { useEffect, useState } from "react";
import ExerciseNavBar from "./ExerciseNavBar";
import HeaderCLassStudent from "./HeaderCLassStudent";
import { useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card } from "react-bootstrap";
import { CiVolumeHigh } from "react-icons/ci";

export default function Listening() {
  const { lessonId } = useParams();
  let [dataListenShort, setDataListenShort] = useState();
  let [dataListenLong, setDataListenLong] = useState();
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
                              <input type="checkbox" />
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
    </>
  );
}
