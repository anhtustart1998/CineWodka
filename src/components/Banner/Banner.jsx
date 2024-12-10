import React from "react";
import { Blog } from "../Blog/Blog";

export const Banner = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-2xl bg-white dark:bg-gray-800 p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Image Container */}
              <div className="relative w-full lg:w-1/2 aspect-video rounded-xl overflow-hidden">
                <a href="/pricing" className="block h-full group">
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300 z-10" />
                  <img
                    alt="Wellness Unveiled"
                    src="https://www.airbushelicopters.ca/wp-content/uploads/2011/11/H175-5.jpg"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
              </div>
              {/* Content Container */}
              <div className="flex flex-col justify-center w-full lg:w-1/2">
                <a
                  href="/category/health"
                  className="inline-flex self-start rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
                >
                  Eurocopter
                </a>

                <h1 className="mt-4 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  <a href="/pricing">
                    It's not just a machine; it's a gateway to the clouds
                  </a>
                </h1>

                <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                  Helicopters don't just traverse distances; they conquer them,
                  elevating us to a place where we see the world not as it is,
                  but as it could be
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <a href="#" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300">
                      <img
                        alt="m1"
                        src="https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Ryan Thomson
                    </span>
                  </a>
                  <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Aug 24 2023
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Blog />
            <Blog />
            <Blog />
            <Blog />
          </div>
        </div>
      </div>
    </section>
  );
};
