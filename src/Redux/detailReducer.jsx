import { createSlice } from "@reduxjs/toolkit";
import { el } from "date-fns/locale";

const initialState = {
  detailMovie: {},
  maRap: "",
  listShowTime: [],
};

const detailReducer = createSlice({
  name: "detail",
  initialState,
  reducers: {
    loadDetailMovie: (state, action) => {
      state.detailMovie = action.payload;
      if (state.detailMovie.heThongRapChieu.length > 0) {
        state.listShowTime = state.detailMovie.heThongRapChieu[0].cumRapChieu;
        state.maRap = state.detailMovie.heThongRapChieu[0].maHeThongRap;
      } else {
        state.listShowTime = [];
        state.maRap = "";
      }
    },
    setMaHeThongRap: (state, action) => {
      state.maRap = action.payload;
      const dataFind = state.detailMovie.heThongRapChieu.find(
        (item) => item.maHeThongRap === state.maRap
      );
      state.listShowTime = dataFind.cumRapChieu;
    },
    reset: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const { loadDetailMovie, setMaHeThongRap, reset } =
  detailReducer.actions;

export default detailReducer.reducer;
