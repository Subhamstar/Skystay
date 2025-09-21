import React from "react";
import notFoundImg from "./dead.png";

const Notfound = () => {
  return (
    <div className="h-screen flex items-center justify-center  px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Illustration */}
        <div className="flex justify-center">
          <img
            src={notFoundImg}
            
            alt="Not Found Illustration"
            className="w-[500px] h-[500px] animate-bounce-slow drop-shadow-xl"
          />
        </div>

        {/* Right Side - Text */}
        <div className="px-10 text-center md:text-left">
          <h1 className="text-7xl font-extrabold text-red-600 mb-4 animate-pulse">
            404
          </h1>
          <p className="text-lg text-gray-700 mb-6 italic">
            Oops... this page has passed away 🙏
          </p>
          <a
            href="/"
            className="px-6 py-3 inline-block rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:scale-105 hover:bg-blue-700 transition transform duration-300 ease-in-out"
          >
            🏠 Take Me Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
