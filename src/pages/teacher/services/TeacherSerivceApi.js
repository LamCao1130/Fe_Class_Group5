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
    let res = await axiosApi.get(`public/vocab/lesson/${id}`);
    return res.data;
  },
  getGrammrByLessonId: async (id) => {
    let res = await axiosApi.get(`grammar/get-by-lesson/${id}`);
    return res.data;
  },
  editVocab: async (data) => {
    let res = await axiosApi.put(`public/vocab/update`, data);
    return res.data;
  },
  deleteVocab: async (id) => {
    let res = await axiosApi.delete(`public/vocab/delete/${id}`);
    return res.data;
  },
};
export default teacherService;
