import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Film,
  Settings,
  BarChart,
  Menu,
} from "lucide-react";

export const AdminSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsOpen(width >= 768);
      setIsCollapsed(width >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { title: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { title: "Movies", icon: <Film size={20} />, path: "/admin/movies" },
    {
      title: "Analytics",
      icon: <BarChart size={20} />,
      path: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  const handleMouseEnter = () => {
    if (!isMobile) setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsCollapsed(true);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed left-4 top-3 z-50 p-2 rounded-lg 
          bg-white dark:bg-gray-800 shadow-lg border border-gray-200 
          dark:border-gray-700 text-gray-700 dark:text-gray-200"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar Backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-0 top-0 z-40 h-screen 
        bg-white dark:bg-gray-800 border-r border-gray-200 
        dark:border-gray-700 pt-20 pb-16 transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "w-64" : isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-2 rounded-lg 
                    hover:bg-gray-100 dark:hover:bg-gray-700 
                    group transition-colors relative
                    ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-500"
                        : "text-gray-700 dark:text-gray-200"
                    }
                  `}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <span className="min-w-[24px]">{item.icon}</span>
                  <span
                    className={`
                      ml-3 whitespace-nowrap transition-all duration-300
                      ${!isMobile && isCollapsed ? "hidden" : "block"}
                    `}
                  >
                    {item.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
