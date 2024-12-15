import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (adminOnly && user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return children;
};
