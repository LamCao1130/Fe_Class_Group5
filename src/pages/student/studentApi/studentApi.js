import { da } from "zod/v4/locales";
import axiosApi from "../../../components/AxiosApi";
import { data } from "react-router";

let studentApi = {
  joinClassRoom: async (code) => {
    let res = await axiosApi.post(
      "http://localhost:8080/api/v1/class-rooms-student/student/join/" + code
    );
    return res;
  },
  getClassRoomStudentApi: async () => {
    let page = 0;
    let size = 10;
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/class-rooms-student/student/classroom?page=${page}&size=${size}`
    );
    return res.data;
  },
  getLessonListApi: async (classRoomId) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/lessons/get-by-classRoomId/${classRoomId}`
    );
    return res.data;
  },
  getVocabList: async (lessonId) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/vocab/lesson/${lessonId}`
    );
    return res.data;
  },
  getDetailLesson: async (lessonId) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/lessons/get-detail/${lessonId}`
    );
    return res.data;
  },
  getListQuestionType: async (datas) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/question-type/get-by-type`,
      datas
    );
    return res.data;
  },
  getListFailOptionVocab: async (datas, id) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/Question/check-answer-vocab/${id}`,
      datas
    );
    return res.data;
  },
  getListFailOptionListen: async (datas, id) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/Question/check-answer-listening/${id}`,
      datas
    );
    return res.data;
  },
  getListFailOptionReading: async (datas, id) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/Question/check-answer-reading/${id}`,
      datas
    );
    return res.data;
  },
  getListListeningByLessonId: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/Question/listening/${id}`
    );
    return res.data;
  },
  getListReadingByLessonId: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/Question/reading/${id}`
    );
    return res.data;
  },
  getAIAnswerWritting: async (data) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/Question/AI-check-writing`,
      data
    );
    return res.data;
  },
  submitWritting: async (data, id) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/Question/check-answer-writing/${id}`,
      data
    );
    return res.data;
  },
  getListSubmitionHistoryByLesson: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/Question/${id}/submissionHistory`
    );
    return res.data;
  },
  getListQuestionByExam: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/Question/exam/manage/${id}`
    );
    return res.data;
  },
  getPoint: async (data) => {
    let res = await axiosApi.post(
      `http://localhost:8080/api/v1/exam/getPoint`,
      data
    );
    return res.data;
  },
  getExam: async (id) => {
    let res = await axiosApi.get(`http://localhost:8080/api/v1/exam/${id}`);
    return res.data;
  },
};
export default studentApi;
