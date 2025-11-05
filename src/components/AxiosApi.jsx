import axios from "axios";

const getToken = () => localStorage.getItem("accessToken");

const axiosApi = axios.create({});

axiosApi.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosApi;
