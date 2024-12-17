import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateImageFile } from "../../../Utils/imageValidation";
import { setNotification } from "../../../Redux/movieSlice";

export const MovieForm = ({ formData, setFormData, onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !validateImageFile(file)) {
      dispatch(
        setNotification({
          type: "error",
          message: "File must be in .jpg, .png, or .gif format!",
        })
      );
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setFormData((prev) => ({
      ...prev,
      hinhAnh: file,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const validateForm = () => {
    if (!formData.tenPhim.trim()) {
      dispatch(
        setNotification({ type: "error", message: "Movie name is required" })
      );
      return false;
    }
    if (!formData.trailer.trim()) {
      dispatch(
        setNotification({ type: "error", message: "Trailer URL is required" })
      );
      return false;
    }
    if (!formData.moTa.trim()) {
      dispatch(
        setNotification({ type: "error", message: "Description is required" })
      );
      return false;
    }
    if (!formData.maNhom.trim()) {
      dispatch(
        setNotification({ type: "error", message: "Group code is required" })
      );
      return false;
    }
    if (!formData.ngayKhoiChieu) {
      dispatch(
        setNotification({ type: "error", message: "Release date is required" })
      );
      return false;
    }
    return true;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          onSubmit(e);
        }
      }}
      className="max-w-2xl mx-auto p-6 space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Movie Name
          </label>
          <input
            type="text"
            name="tenPhim"
            value={formData.tenPhim}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Trailer
          </label>
          <input
            type="text"
            name="trailer"
            value={formData.trailer}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Description
          </label>
          <textarea
            name="moTa"
            value={formData.moTa}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Group Code
          </label>
          <input
            type="text"
            name="maNhom"
            value={formData.maNhom}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Release Date
          </label>
          <DatePicker
            selected={
              formData.ngayKhoiChieu ? new Date(formData.ngayKhoiChieu) : null
            }
            onChange={(date) => handleDateChange(date, "ngayKhoiChieu")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Now Showing
          </label>
          <select
            name="sapChieu"
            value={formData.sapChieu}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Coming Soon
          </label>
          <select
            name="dangChieu"
            value={formData.dangChieu}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Hot
          </label>
          <select
            name="hot"
            value={formData.hot}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Rating
          </label>
          <input
            type="number"
            name="danhGia"
            value={formData.danhGia}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            min="0"
            max="10"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2 dark:text-gray-200">
            Movie Poster
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors duration-200"
            accept="image/*"
          />

          {selectedFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
              <p className="text-sm text-gray-500 mt-1">New poster preview</p>
            </div>
          )}

          {!selectedFile &&
            formData.hinhAnh &&
            typeof formData.hinhAnh === "string" && (
              <div className="mt-2">
                <img
                  src={formData.hinhAnh}
                  alt="Current poster"
                  className="w-32 h-32 object-cover rounded"
                />
                <p className="text-sm text-gray-500 mt-1">Current poster</p>
              </div>
            )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          Save
        </button>
      </div>
    </form>
  );
};
