import React from "react";

export const Hero = () => {
  return (
    <section className="relative pb-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white text-center break-words">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              CineWodka
            </span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto px-4">
            Where Every Scene is a Cinematic Masterpiece, Served with a Shot of
            Spirit and a Twist of Fun! 🎥🍸
          </p>
        </div>
      </div>
    </section>
  );
};
