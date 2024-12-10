import React from "react";

export const Blog = () => {
  return (
    <div className="transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-6 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative w-full sm:w-2/5 aspect-[4/3] rounded-xl overflow-hidden">
          <a href="#" className="block h-full group">
            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300 z-10" />
            <img
              alt="Culinary Expeditions"
              src="https://helicopters.leonardo.com/o/adaptive-media/image/26408693/h_695/MNT-DJ-22-142_Extract%20video%20%20%286%29.jpg"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </a>
        </div>

        {/* Content Container */}
        <div className="flex flex-col justify-center w-full sm:w-3/5">
          <a
            href="#"
            className="inline-flex self-start rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
          >
            AgustaWestland
          </a>

          <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2">
            <a href="#">Where wheels can't reach, the rotors will soar.</a>
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              By Lukas Hestenberg
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Aug 24 2023
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
