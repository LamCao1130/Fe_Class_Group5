import { size } from "zod";
import axiosApi from "../AxiosApi";
import { data } from "react-router";
import { da, id } from "zod/locales";

const URL_BASE = "http://localhost:8080/api/admin";

export const adminApi = {
    getAllTeacherAccount: async (page = 0, size = 10) => {
        const res = await axiosApi.get(`${URL_BASE}/teacher`, { params: { page, size } });
        return res.data;
    },
    getTeacherAccountAndClassesById: async (id) => {
        const res = await axiosApi.get(`${URL_BASE}/teacher/${id}`);
        return res.data;
    },
    createTeacherAccount: async (data) => {
        const res = await axiosApi.post(`${URL_BASE}/teacher/create`, data);
        return res.data;
    },
    editTeacherAccount: async (data, id) => {
        const res = await axiosApi.put(`${URL_BASE}/teacher/edit/${id}`, data);
        return res.data;
    },
    deleteTeacherAccount: async (id) => {
        const res = await axiosApi.patch(`${URL_BASE}/teacher/delete/${id}`);
        return res.data;
    },
    restoreTeacherAccount: async (id) => {
        const res = await axiosApi.patch(`${URL_BASE}/teacher/restore/${id}`);
        return res.data;
    },
    getAllClassRoom: async (page = 0, size = 10) => {
        const res = await axiosApi.get(`${URL_BASE}/classroom`, { params: { page, size } });
        return res.data;
    },
    createClassRoom: async (data) => {
        const res = await axiosApi.post(`${URL_BASE}/classroom/create`, data);
        return res.data;
    },
    updateClassRoom: async (id, data) => {
        const res = await axiosApi.put(`${URL_BASE}/classroom/edit/${id}`, data);
        return res.data;
    },
    deleteClassRoom: async (id) => {
        const res = await axiosApi.patch(`${URL_BASE}/classroom/delete/${id}`);
        return res.data;
    },
    restoreClassRoom: async (id) => {
        const res = await axiosApi.patch(`${URL_BASE}/classroom/restore/${id}`);
        return res.data;
    },
    getClassRoomDetailById: async (id) => {
        const res = await axiosApi.get(`${URL_BASE}/classroom/${id}`);
        return res.data;
    },

}