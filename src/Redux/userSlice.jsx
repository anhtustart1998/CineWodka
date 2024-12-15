import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    isLoading: false,
    error: null,
    userTypes: [],
    notification: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.content.items;
      state.totalCount = action.payload.content.totalCount;
      state.currentPage = action.payload.content.currentPage;
    },
    setUserTypes: (state, action) => {
      state.userTypes = action.payload.content;
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
  },
});

export const {
  setUsers,
  setUserTypes,
  setLoading,
  setError,
  setCurrentPage,
  setNotification,
  clearNotification,
} = userSlice.actions;

export default userSlice.reducer;
