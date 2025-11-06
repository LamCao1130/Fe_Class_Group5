import axiosApi from "../../../components/AxiosApi";

let teacherService = {
  getListClassRoomByTeacherId: async (id) => {
    let res = await axiosApi.get(
      "http://localhost:8080/api/v1/class-rooms/get-by-teacher/" + id
    );
    return res;
  },
  getClassroomDetailById: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/class-rooms/get/${id}`
    );
    return res.data;
  },
  getLessonByClassroomId: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/lessons/get-by-classRoomId/${id}`
    );
    return res.data;
  },
  getVocabByLessonId: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/public/vocab/lesson/${id}`
    );
    return res.data;
  },
  getGrammrByLessonId: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/grammar/get-by-lesson/${id}`
    );
    return res.data;
  },
  editVocab: async (data) => {
    let res = await axiosApi.put(
      `http://localhost:8080/api/v1/public/vocab/update`,
      data
    );
    return res.data;
  },
  deleteVocab: async (id) => {
    let res = await axiosApi.delete(
      `http://localhost:8080/api/v1/public/vocab/delete/${id}`
    );
    return res.data;
  },

  createQuestion: async (data) => {
    let res = await axiosApi.post(
      "http://localhost:8080/api/v1/Question/create",
      data
    );
    return res.data;
  },
  importVocab: async (file, lessonId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("lessonId", lessonId);
    let res = await axiosApi.post(
      "http://localhost:8080/api/v1/public/vocab/import",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  },
  getQuestion: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/Question/lesson/${id}`
    );
    return res.data;
  },
  deleteListQuestionByQuestionType: async (id) => {
    let res = await axiosApi.delete(
      `http://localhost:8080/api/v1/Question/deleteByQuestionType/${id}`
    );
    return res.data;
  },
  deleteReadingPassage: async (id) => {
    let res = await axiosApi.delete(
      `http://localhost:8080/api/v1/Question/delete/reading/${id}`
    );
    return res.data;
  },
  getQuestionType: async (id) => {
    let res = await axiosApi.get(
      `http://localhost:8080/api/v1/Question/questionType/${id}`
    );
    return res.data;
  },
  updateQuestionType: async (data) => {
    let res = await axiosApi.put(
      `http://localhost:8080/api/v1/Question/update`,
      data
    );
    return res.data;
  },
};
export default teacherService;
