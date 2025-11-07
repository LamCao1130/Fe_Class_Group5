import React, { useEffect, useState } from "react";
import ExerciseNavBar from "./ExerciseNavBar";
import { useParams } from "react-router";
import studentApi from "../studentApi/studentApi";
import { Button, Card } from "react-bootstrap";
import { Key } from "lucide-react";
import HeaderCLassStudent from "./HeaderCLassStudent";

export default function Vocabulary() {
  const { lessonId } = useParams();
  const [listMc, setListMc] = useState([]);
  const [listFill, setListFill] = useState([]);
  const [answers, setAnswers] = useState([]);
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
      <div style={{ marginTop: "30px" }}>
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
      <Button
        style={{ margin: "30px" }}
        onClick={async () => {
          try {
            let res = await studentApi.getListFailOption(answers);
            console.log(res);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Nộp nài
      </Button>
    </>
  );
}
