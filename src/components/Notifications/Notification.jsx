import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../../Redux/userSlice";

export const Notification = ({ type, message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setNotification(null));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, message]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`}
    >
      {message}
    </div>
  );
};
