import axios from "axios";
import { useNavigate } from "react-router";

const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const axiosApi = axios.create({});

const refreshApi = axios.create({});

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

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu BE trả về 401 (token hết hạn)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // tránh lặp vô hạn

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        console.warn("No refresh token — redirecting to login");
        localStorage.clear();
        useNavigate("/");
        // return Promise.reject(error);
      }

      try {
        // Gửi refresh token lên BE
        const res = await refreshApi.post(
          "http://localhost:8080/api/v1/public/refresh",
          { refreshToken: refreshToken }
        );

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken; // nếu BE trả về mới

        // Lưu token mới
        localStorage.setItem("accessToken", newAccessToken);
        if (newRefreshToken)
          localStorage.setItem("refreshToken", newRefreshToken);

        // Gắn token mới vào header của request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Gửi lại request gốc
        return axiosApi(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid or expired:", refreshError);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    // Nếu là lỗi khác (403, 404, 500, ...)
    return Promise.reject(error);
  }
);
export default axiosApi;
