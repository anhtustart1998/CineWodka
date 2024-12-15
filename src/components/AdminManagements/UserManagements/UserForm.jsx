import React from "react";
import { useState } from "react";
import { validateForm } from "../../../Utils/validation";

export const UserForm = ({
  formData,
  setFormData,
  userTypes,
  onSubmit,
  onClose,
}) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (validateForm[name]) {
      return validateForm[name](value);
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (validateForm[key]) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Username
        </label>
        <input
          type="text"
          name="taiKhoan"
          value={formData.taiKhoan}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            errors.taiKhoan
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm text-gray-900 dark:text-white`}
        />
        {errors.taiKhoan && (
          <p className="mt-1 text-sm text-red-500">{errors.taiKhoan}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <input
          type="password"
          name="matKhau"
          value={formData.matKhau}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            errors.matKhau
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm text-gray-900 dark:text-white`}
        />
        {errors.matKhau && (
          <p className="mt-1 text-sm text-red-500">{errors.matKhau}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Full Name
        </label>
        <input
          type="text"
          name="hoTen"
          value={formData.hoTen}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            errors.hoTen
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm text-gray-900 dark:text-white`}
        />
        {errors.hoTen && (
          <p className="mt-1 text-sm text-red-500">{errors.hoTen}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm text-gray-900 dark:text-white`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Phone Number
        </label>
        <input
          type="tel"
          name="soDt"
          value={formData.soDt}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            errors.soDt
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm text-gray-900 dark:text-white`}
        />
        {errors.soDt && (
          <p className="mt-1 text-sm text-red-500">{errors.soDt}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          User Type
        </label>
        <select
          name="maLoaiNguoiDung"
          value={formData.maLoaiNguoiDung}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          required
        >
          <option value="">Select user type</option>
          {userTypes.map((type) => (
            <option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>
              {type.tenLoai}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Group Code
        </label>
        <select
          name="maNhom"
          value={formData.maNhom}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          required
        >
          <option value="">Select group</option>
          <option value="GP01">GP01</option>
          <option value="GP02">GP02</option>
          <option value="GP03">GP03</option>
          <option value="GP04">GP04</option>
          <option value="GP05">GP05</option>
          <option value="GP06">GP06</option>
          <option value="GP07">GP07</option>
          <option value="GP08">GP08</option>
          <option value="GP09">GP09</option>
          <option value="GP10">GP10</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
};
