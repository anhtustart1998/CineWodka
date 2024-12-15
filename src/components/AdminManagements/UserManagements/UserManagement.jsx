import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Search, Plus, Edit, Trash } from "lucide-react";
import { userAPI } from "../../../services/userAPI";
import { UserForm } from "./UserForm";
import { Notification } from "../../Notifications/Notification";
import {
  setUsers,
  setUserTypes,
  setLoading,
  setError,
  setCurrentPage,
  setNotification,
} from "../../../Redux/userSlice";

export const UserManagement = () => {
  const dispatch = useDispatch();
  const {
    users,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalCount,
    userTypes,
    notification,
  } = useSelector((state) => state.users);
  const [maNhom, setMaNhom] = useState("GP01");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await userAPI.getPaginatedUsers(
        currentPage,
        pageSize,
        maNhom
      );
      dispatch(setUsers(response));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchUserTypes = async () => {
    try {
      const response = await userAPI.getUserTypes();
      dispatch(setUserTypes(response));
    } catch (error) {
      console.error("Failed to fetch user types:", error);
    }
  };

  //   useEffect(() => {
  //     fetchUsers();
  //     fetchUserTypes();
  //   }, [currentPage, pageSize, maNhom]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      if (searchTerm.trim()) {
        const response = await userAPI.searchUsers(
          searchTerm,
          maNhom,
          currentPage,
          pageSize
        );
        dispatch(setUsers(response));
      } else {
        fetchUsers();
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch(new Event("submit"));
    } else {
      fetchUsers();
      fetchUserTypes();
    }
  }, [currentPage, pageSize, maNhom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      if (selectedUser) {
        await userAPI.updateUser(formData);
        dispatch(
          setNotification({
            type: "success",
            message: "User updated successfully!",
          })
        );
      } else {
        await userAPI.createUser(formData);
        dispatch(
          setNotification({
            type: "success",
            message: "User created successfully!",
          })
        );
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          message: error.response?.data?.message || error.message,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (username) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        dispatch(setLoading(true));
        await userAPI.deleteUser(username);
        dispatch(
          setNotification({
            type: "success",
            message: "User deleted successfully!",
          })
        );
        fetchUsers();
      } catch (error) {
        dispatch(
          setNotification({
            type: "error",
            message: error.response?.data?.message || error.message,
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl dark:text-white">
          CineWodka User Management System
        </h1>
      </div>
      <div onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          {/* Group Code Search */}
          <div className="w-64">
            <input
              type="text"
              value={maNhom}
              onChange={(e) => setMaNhom(e.target.value)}
              placeholder="Enter group code"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            />
          </div>
          {/* User Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Search size={20} /> Search
              </button>
            </div>
          </form>

          {/* Add User Button */}
          <button
            onClick={() => {
              setSelectedUser(null);
              setFormData({
                taiKhoan: "",
                matKhau: "",
                email: "",
                soDt: "",
                maNhom: "GP01",
                maLoaiNguoiDung: "",
                hoTen: "",
              });
              setShowModal(true);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add User
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin h-8 w-8 text-purple-600" />
        </div>
      ) : (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Password</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user) => (
              <Table.Row
                key={user.taiKhoan}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.taiKhoan}
                </Table.Cell>
                <Table.Cell>{user.hoTen}</Table.Cell>
                <Table.Cell>{user.matKhau}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.soDt}</Table.Cell>
                {user.maLoaiNguoiDung}
                <Table.Cell>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setFormData({
                          ...user,
                          maNhom: user.maNhom || "GP01",
                        });
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.taiKhoan)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(totalCount / pageSize) || 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => dispatch(setCurrentPage(index + 1))}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedUser ? "Edit User" : "Add New User"}
            </h2>
            <UserForm
              formData={formData}
              setFormData={setFormData}
              userTypes={userTypes}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
