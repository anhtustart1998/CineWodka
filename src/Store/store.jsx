import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import userReducer from "../Redux/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});
