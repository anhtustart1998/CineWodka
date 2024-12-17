import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN_CYBERSOFT = import.meta.env.VITE_TOKEN_CYBERSOFT;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    "Content-Type": "application/json-patch+json",
  },
});

const protectedEndpoints = [
  "/QuanLyNguoiDung/ThongTinTaiKhoan",
  "/QuanLyNguoiDung/ThemNguoiDung",
  "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
  "/QuanLyNguoiDung/XoaNguoiDung",
  "/QuanLyPhim/CapNhatPhimUpload",
  "/QuanLyPhim/XoaPhim",
  "/api/QuanLyPhim/ThemPhimUploadHinh",
];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (
      protectedEndpoints.some((endpoint) => config.url.includes(endpoint)) &&
      token
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
