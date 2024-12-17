import { axiosInstance } from "./axiosConfig";

export const userAPI = {
  getUserTypes: async () => {
    const response = await axiosInstance.get(
      "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
    );
    return response.data;
  },
  getPaginatedUsers: async (page = 1, pageSize = 20, maNhom = "GP06") => {
    const response = await axiosInstance.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
    );
    return response.data;
  },
  createUser: async (userData) => {
    const response = await axiosInstance.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      {
        ...userData,
        maNhom: userData.maNhom || "GP01",
      }
    );
    return response.data;
  },
  updateUser: async (userData) => {
    const response = await axiosInstance.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      {
        ...userData,
        maNhom: userData.maNhom || "GP01",
      }
    );
    return response.data;
  },
  deleteUser: async (username) => {
    const response = await axiosInstance.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`
    );
    return response.data;
  },
  searchUsers: async (tuKhoa, maNhom = "GP01", page = 1, pageSize = 20) => {
    const response = await axiosInstance.get(
      `/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
    );
    return response.data;
  },
};
