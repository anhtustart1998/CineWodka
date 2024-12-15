import React from "react";
import { FiGithub, FiFacebook, FiLinkedin } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="z-50 w-full border dark:border-gray-800 dark:shadow-lg shadow-md bg-white dark:bg-gray-900 transition-colors duration-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="text-gray-600 dark:text-gray-300">
            <span className="font-bold">CineWodka</span>
            <span className="mx-2">•</span>
            <span>© 2025 All rights reserved</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
            >
              Privacy
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
              aria-label="Github"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
              aria-label="Twitter"
            >
              <FiFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
