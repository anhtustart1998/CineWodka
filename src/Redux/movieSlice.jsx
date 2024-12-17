import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  error: null,
  notification: null,
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.items;
      state.totalCount = action.payload.totalCount;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const {
  setMovies,
  setLoading,
  setError,
  setCurrentPage,
  setNotification,
  clearNotification,
  setSelectedMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
