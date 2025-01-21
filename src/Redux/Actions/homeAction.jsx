import { detailAPI } from "../../services/detailAPI";
import { homeAPI } from "../../services/homeAPI";
import { loadDetailMovie } from "../detailReducer";
import {
  loadBanner,
  loadCumRap,
  loadHeThongRapPhim,
  loadListProduct,
} from "../homeReducer";

export const loadBannerAction = () => {
  return async (dispatch) => {
    try {
      const data = await homeAPI.getBanner();
      dispatch(loadBanner(data.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const aixiosMoviveAction = (currentPage, pageSize, tagMovie) => {
  return async (dispatch) => {
    try {
      const response = await homeAPI.getListMovie();
      const movies = response.data.content;
      dispatch(
        loadListProduct({
          movies,
          currentPage,
          pageSize,
          tagMovie,
        })
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const axiosLayThonTinHeThongRap = () => {
  return async (dispatch) => {
    try {
      const response = await homeAPI.layThongTinHeThongRap();
      dispatch(loadHeThongRapPhim(response.data.content));
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const axiosLayThongTinLichChieuHeThongRap = (maRap) => {
  return async (dispatch) => {
    try {
      const response = await homeAPI.layThongTinLichChieuHeThongRap(maRap);
      dispatch(loadCumRap(response.data.content[0].lstCumRap));
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const axiosGetDetailMovie = (maPhim) => {
  return async (dispatch) => {
    try {
      const response = await detailAPI.layThongtinChiTietPhim(maPhim);
      dispatch(loadDetailMovie(response.data.content));
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
