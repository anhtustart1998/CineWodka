import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import userReducer from "../Redux/userSlice";
import movieReducer from "../Redux/movieSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
  },
});
