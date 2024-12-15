import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminSidebar } from "../../components/Sidebar/Sidebar";

export const AdminPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="min-h-screentransition-colors duration-300">
      <AdminSidebar />
      <div className="lg:ml-20 min-h-screen pb-16">
        <div className="px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
