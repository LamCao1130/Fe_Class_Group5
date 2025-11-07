import axiosApi from "../../../components/AxiosApi";

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
};
export default studentApi;
