import { size } from "zod";
import axiosApi from "../AxiosApi";

const URL_BASE = "http://localhost:8080/api/admin";

export const adminApi = {
     getAllTeacherAccount: async (page = 0, size = 10) => {
        const res = await axiosApi.get(`${URL_BASE}/teacher`,{params:{page,size}});
        return res.data;
    },
    getTeacherAccountAndClassesById: async(id) => {
        const res = await axiosApi.get(`${URL_BASE}/teacher/${id}`);
        return res.data;
    },
    createTeacherAccount: async(data) => {
        const res = await axiosApi.post(`${URL_BASE}/create`,data);
        return res.data;
    },
    editTeacherAccount: async(data,id) => {
        const res = await axiosApi.put(`${URL_BASE}/edit/${id}`,data);
        return res.data;
    },
    deleteTeacherAccount: async(id) => {
        const res = await axiosApi.patch(`${URL_BASE}/delete/${id}`);
        return res.data;
    },
    restoreTeacherAccount: async(id) => {
        const res = await axiosApi.patch(`${URL_BASE}/restore/${id}`);
        return res.data;
    },
    getAllClassRoom: async(page = 0, size = 10) => {
        const res = await axiosApi.get(`${URL_BASE}/classroom`,{params:{page,size}});
        return res.data;
    }

}