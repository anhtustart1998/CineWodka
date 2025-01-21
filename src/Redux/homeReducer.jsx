import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataBanner: [],
  listProduct: [],
  totalCount: 0,
  pageSize: 5,
  tagMovie: "hot",
  // hệ thống rạp
  cinemas: [],
  listCumRap: [],
  maHeThongRap: "",
  listLichChieu: [],
  maCumRaps: "",
};

const homeReducer = createSlice({
  name: "home",
  initialState,
  reducers: {
    // loadBanner
    loadBanner: (state, action) => {
      state.dataBanner = action.payload;
    },
    //load danh sách phim
    loadListProduct: (state, action) => {
      const { movies, currentPage, pageSize, tagMovie } = action.payload;
      state.tagMovie = tagMovie;
      // Filter by tagMovie
      switch (tagMovie) {
        case "hot":
          state.listProduct = movies.filter((item) => item.hot);
          break;

        case "sapChieu":
          state.listProduct = movies.filter((item) => item.sapChieu);
          break;

        case "dangChieu":
          state.listProduct = movies.filter((item) => item.dangChieu);
          break;

        default:
          // Trường hợp không khớp với tag nào, giữ nguyên danh sách cũ
          state.listProduct = movies.filter((item) => item.hot);
          break;
      }
      state.totalCount = state.listProduct.length;

      // Phân trang
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      state.listProduct = state.listProduct.slice(startIndex, endIndex);
    },
    changTagMovie: (state, action) => {
      state.tagMovie = action.payload;
    },
    // load hệ thống rạp
    loadHeThongRapPhim: (state, action) => {
      state.cinemas = action.payload;
      state.maHeThongRap = action.payload[0].maHeThongRap;
    },
    loadCumRap: (state, action) => {
      state.listCumRap = action.payload;
      state.listLichChieu = state.listCumRap[0].danhSachPhim;
      state.maCumRaps = state.listCumRap[0].maCumRap;
    },
    setMaHeThongRap: (state, action) => {
      state.maHeThongRap = action.payload;
    },
    loadLichChieuTheoCumRap: (state, action) => {
      state.maCumRaps = action.payload;
      const dataFind = state.listCumRap.find(
        (item) => item.maCumRap === state.maCumRaps
      );
      state.listLichChieu = dataFind.danhSachPhim;
    },
  },
});

export const {
  loadBanner,
  loadListProduct,
  changTagMovie,
  loadHeThongRapPhim,
  loadCumRap,
  loadLichChieuTheoCumRap,
  setMaHeThongRap,
} = homeReducer.actions;

export default homeReducer.reducer;
