import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import userReducer from "../Redux/userSlice";
import movieReducer from "../Redux/movieSlice";
import homeReducer from "../Redux/homeReducer";
import detailReducer from "../Redux/detailReducer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    movies: movieReducer,
    home: homeReducer,
    detail: detailReducer,
  },
});
