import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../../Auth/authSlice";
import { authAPI } from "../../services/authAPI";
import { validateForm } from "../../Utils/validation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "MK15",
    hoTen: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error: apiError } = useSelector((state) => state.auth);

  const validateField = (name, value) => {
    if (validateForm[name]) {
      return validateForm[name](value);
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (validateForm[key]) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    dispatch(loginStart());

    try {
      const response = await authAPI.register(formData);
      dispatch(loginSuccess(response.content));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Join the Party! 🎬🍸
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Where cinema meets vodka - Let's shake things up!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Username
              </label>
              <input
                type="text"
                name="taiKhoan"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                placeholder="Enter your username"
                value={formData.taiKhoan}
                onChange={handleChange}
              />
              {errors.taiKhoan && (
                <p className="mt-1 text-sm text-red-500">{errors.taiKhoan}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="matKhau"
                  required
                  className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white pr-10"
                  placeholder="Create a password"
                  value={formData.matKhau}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
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
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                placeholder="Enter your full name"
                value={formData.hoTen}
                onChange={handleChange}
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
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                placeholder="Enter your phone number"
                value={formData.soDt}
                onChange={handleChange}
              />
              {errors.soDt && (
                <p className="mt-1 text-sm text-red-500">{errors.soDt}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Group Code
              </label>
              <input
                type="text"
                name="maNhom"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                placeholder="Enter your group code"
                value={formData.maNhom}
                onChange={handleChange}
              />
            </div>
          </div>

          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Mix & Join! 🎉"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have a ticket?{" "}
            <NavLink
              to={"/login"}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign in here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
