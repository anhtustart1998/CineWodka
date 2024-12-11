import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../../Auth/authSlice";
import { authAPI } from "../../services/authAPI";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error: apiError } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.taiKhoan || !formData.matKhau) {
      return;
    }

    dispatch(loginStart());

    try {
      const response = await authAPI.login(formData);
      dispatch(loginSuccess(response.content));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center p-4 mt-10">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back! 🎥
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your cinematic vodka awaits!
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
                  placeholder="Enter your password"
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
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <NavLink
                to={"/"}
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot password?
              </NavLink>
            </div>
          </div>

          {apiError && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-3">
              <p className="text-sm text-red-700 dark:text-red-200">
                {apiError}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Pour Me In! 🍸"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Need a ticket?{" "}
            <NavLink
              to={"/register"}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Get your pass here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
