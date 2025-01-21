import { axiosInstance } from "./axiosConfig";

export const detailAPI = {
  layThongtinChiTietPhim: (maPhim) => {
    return axiosInstance.get(
      `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
};
