import { axiosInstance } from "./axiosConfig";

export const movieAPI = {
  getPaginatedMovies: async (page = 1, pageSize = 10, maNhom = "GP01") => {
    const response = await axiosInstance.get(
      `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
    );
    return response.data;
  },
  getMoviesByDate: async (tuNgay, denNgay, maNhom = "GP01") => {
    const response = await axiosInstance.get(
      `/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${maNhom}&tuNgay=${tuNgay}&denNgay=${denNgay}`
    );
    return response.data;
  },
  createMovie: async (formData) => {
    const response = await axiosInstance.post(
      "/QuanLyPhim/ThemPhimUploadHinh",
      formData
    );
    return response.data;
  },
  updateMovie: async (formData) => {
    const response = await axiosInstance.post(
      "/QuanLyPhim/CapNhatPhimUpload",
      formData
    );
    return response.data;
  },
  getMovieDetails: async (maPhim) => {
    const response = await axiosInstance.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
    );
    return response.data;
  },
  deleteMovie: async (maPhim) => {
    const response = await axiosInstance.delete(
      `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
    );
    return response.data;
  },
};
