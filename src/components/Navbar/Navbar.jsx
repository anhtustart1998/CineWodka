import React, { useState } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.jsx";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Auth/authSlice.jsx";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark } = useTheme();
  // Take all user data from Redux
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const truncateName = (name) => {
    if (!name) return "";
    return name.length > 6 ? name.substring(0, 6) + "..." : name;
  };

  const displayName = truncateName(user?.hoTen || user?.taiKhoan);

  const AuthLinks = () => (
    <>
      <NavLink
        to={"/"}
        className={(props) =>
          props.isActive
            ? "text-red-500 font-semibold border border-white dark:border-gray-900 shadow-xl hover:text-blue-500 transition-colors"
            : "hover:text-blue-500 transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/login"}
        className={(props) =>
          props.isActive
            ? "text-red-500 font-semibold border border-white dark:border-gray-900 shadow-xl hover:text-blue-500 transition-colors"
            : "hover:text-blue-500 transition-colors"
        }
      >
        Login
      </NavLink>
      <NavLink
        to={"/register"}
        className={(props) =>
          props.isActive
            ? "text-red-500 font-semibold border border-white dark:border-gray-900 shadow-xl hover:text-blue-500 transition-colors"
            : "hover:text-blue-500 transition-colors"
        }
      >
        Register
      </NavLink>
    </>
  );

  const UserLinks = () => (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <UserCircle className="w-5 h-5" />
        <span className="font-medium">{displayName}</span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 hover:text-red-500 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md dark:bg-gray-900 dark:text-white bg-white text-gray-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-semibold text-xl">
            <NavLink to={"/"}>CineWodka</NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? <UserLinks /> : <AuthLinks />}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-colors dark:hover:bg-gray-800 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-4 dark:bg-gray-900 bg-white">
              {user ? (
                <>
                  <div className="px-4">
                    <UserLinks />
                  </div>
                </>
              ) : (
                <AuthLinks />
              )}
              <div className="px-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
