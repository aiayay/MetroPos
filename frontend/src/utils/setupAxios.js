// src/utils/setupAxios.js
import axios from "axios";
import { API_URL } from "../constants"; // Sesuaikan dengan path yang benar

// Buat instance axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Tambahkan interceptor untuk menyertakan token di setiap permintaan
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Sertakan token di header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
