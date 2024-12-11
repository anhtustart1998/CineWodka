import { axiosInstance } from "./axiosConfig";

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(
        "/QuanLyNguoiDung/DangKy",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(
        "/QuanLyNguoiDung/DangNhap",
        credentials
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
