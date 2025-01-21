import { axiosInstance } from "./axiosConfig";

export const homeAPI = {
  getBanner: () => {
    return axiosInstance.get("/QuanLyPhim/LayDanhSachBanner");
  },
  getListMovie: () => {
    return axiosInstance.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`);
  },
  layThongTinHeThongRap: () => {
    return axiosInstance.get("/QuanLyRap/LayThongTinHeThongRap");
  },
  layThongTinLichChieuHeThongRap: (maRap) => {
    return axiosInstance.get(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP01`
    );
  },
};
