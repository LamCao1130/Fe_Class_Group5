import axiosApi from "../../../components/AxiosApi";

let teacherService = {
  getListClassRoomByTeacherId: async (id) => {
    let res = await axiosApi.get(
      "http://localhost:8080/api/v1/class-rooms/get-by-teacher/" + id
    );
    return res;
  },
};
export default teacherService;
