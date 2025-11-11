import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import studentApi from "../studentApi/studentApi";
import { Button, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const ExamQuestion = () => {
  const token = localStorage.getItem("accessToken");
  const [modal, showModal] = useState(false);
  const decoded = jwtDecode(token);
  const accountId = decoded.accountId;
  const { id } = useParams();
  const [examData, setExamData] = useState([]);
  const [exam, setExam] = useState();
  const [answers, setAnswers] = useState([]);
  const [createdAt, setCreatedAt] = useState({});
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      let timer;

      try {
        const res = await studentApi.getListQuestionByExam(id);
        const resExam = await studentApi.getExam(id);
        setExamData(res);
        setExam(resExam);
        const examEndTime = parseDateFromApi(resExam?.examDateEnd);
        const currentTime = new Date();

        if (examEndTime) {
          const initialTimeLeft = calculateSecondsDifference(
            examEndTime,
            currentTime
          );

          setTimeLeft(initialTimeLeft);
          setCreatedAt(new Date());
        }
      } catch (err) {
        console.error("Lỗi tải đề thi:", err);
      }
    };
    fetchExam();
  }, [id]);

  const parseDateFromApi = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };
  const [isSubmitted, setsubmited] = useState(false);
  const [mark, setMark] = useState();
  const calculateMinutesDifference = (date1, date2) => {
    const time1 = date1.getTime();
    const time2 = date2.getTime();

    const differenceInMilliseconds = Math.abs(time1 - time2);

    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return differenceInMinutes;
  };
  const calculateSecondsDifference = (dateEnd, dateStart) => {
    if (
      !dateEnd ||
      !dateStart ||
      isNaN(dateEnd.getTime()) ||
      isNaN(dateStart.getTime())
    ) {
      return 0;
    }
    const differenceInMilliseconds = dateEnd.getTime() - dateStart.getTime();
    return Math.max(0, Math.floor(differenceInMilliseconds / 1000));
  };
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  useEffect(() => {
    let timer;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            setSubmited(true);
            handleSubmit();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);
  const formatCountdown = useMemo(() => {
    const totalSeconds = timeLeft;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(seconds).padStart(2, "0");

    return `${displayMinutes}:${displaySeconds}`;
  }, [timeLeft]);
  const handleSubmit = async () => {
    const res = await studentApi.getPoint({
      examId: id,
      startedAt: createdAt,
      submittedAt: new Date(),
      timeSpent: calculateMinutesDifference(new Date(), createdAt),
      answers: answers,
      studentId: accountId,
    });
    setMark(res || 0);
    setAnswers([]);
    setSubmited(true);
  };

  const handleSelect = (questionId, optionId) => {
    setAnswers((prevAnswers) => {
      const currentOptions = prevAnswers[questionId] || [];

      let newOptions;

      if (currentOptions.includes(optionId)) {
        newOptions = currentOptions.filter((id) => id !== optionId);
      } else {
        newOptions = [...currentOptions, optionId];
      }

      return {
        ...prevAnswers,
        [questionId]: newOptions,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">LÀM BÀI THI</h1>
          <p className="mt-1 text-sm opacity-90">Mã đề: {id}</p>
          <div className="text-danger text-lg font-mono mt-2">
            <h1> Thời gian còn lại: {formatCountdown} </h1>
          </div>
        </header>

        <main className="p-6 space-y-10">
          {examData.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Đang tải...</p>
            </div>
          ) : (
            examData.map((part, partIdx) => {
              const qt = part.questionTypeDto;
              if (!qt?.questions?.length) return null;

              return (
                <section key={partIdx} className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-bold text-indigo-700 border-b-2 border-indigo-600 inline-block pb-1">
                    {partIdx + 1}. {qt.name}
                  </h2>

                  {part.readingDto && (
                    <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 italic text-gray-800 leading-relaxed">
                      <strong className="block mb-2 text-blue-900 font-semibold">
                        {part.readingDto.title}
                      </strong>
                      <p>{part.readingDto.passageContent}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {qt.questions.map((q, qIdx) => (
                      <div
                        key={q.id}
                        className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <p className="font-semibold text-gray-800 mb-4 text-base md:text-lg">
                          <span className="text-indigo-700">
                            Câu {qIdx + 1}:
                          </span>{" "}
                          {q.questionText}
                        </p>

                        <div className="space-y-3 ml-6">
                          {q.options.map((opt) => {
                            const selected = answers[q.id]?.includes(opt.id);
                            return (
                              <div>
                                <label
                                  key={opt.id}
                                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                                  ${
                                    selected
                                      ? "bg-indigo-100 border-indigo-500 font-medium"
                                      : "bg-white border-gray-300 hover:bg-indigo-50 hover:border-indigo-400"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    name={`q-${q.id}`}
                                    checked={selected}
                                    onChange={() => handleSelect(q.id, opt.id)}
                                    className="me-3 scale-110 text-indigo-600"
                                  />
                                  <span className="flex-1">
                                    {opt.optionText}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          )}
          <div className="p-6 mt-3 ">
            <Button onClick={() => showModal(true)}>Nộp bài</Button>
          </div>{" "}
        </main>
      </div>
      <Modal show={modal}>
        <Modal.Body>
          <div>Bạn có chắc chắn muốn nộp bài</div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              handleSubmit(), showModal(false);
            }}
          >
            Ok
          </Button>
          <Button onClick={() => showModal(false)}>X</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={submited}>
        <Modal.Body>Điểm số của bạn là : {mark}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate(-1)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExamQuestion;
