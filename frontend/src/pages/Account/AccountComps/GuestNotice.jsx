import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../../Context/Usercontext";

const GuestNotice = () => {
  const navigate = useNavigate();
  const { setIsHostMode } = useContext(userContext);

  const handleSwitchToHost = () => {
    localStorage.setItem("hostMode", "true");
    setIsHostMode(true);
    // Refresh to show verification
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 border border-purple-200">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            Guest Mode Active
          </h1>
          <p className="text-gray-600 text-lg">
            You're currently browsing as a guest
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            ✨ Want to start hosting?
          </h2>
          <p className="text-gray-700 mb-4">
            Switch to Host Mode to list your rooms and start earning. It's quick and easy!
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-pink-500 font-bold">✓</span>
              <span>List multiple rooms and properties</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500 font-bold">✓</span>
              <span>Set your own prices and availability</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500 font-bold">✓</span>
              <span>Receive instant bookings</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500 font-bold">✓</span>
              <span>Manage bookings and guests</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSwitchToHost}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition text-lg"
          >
            🏠 Switch to Host Mode
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full text-purple-600 font-semibold py-3 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition"
          >
            Continue as Guest
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          You can always switch back to guest mode anytime from your profile menu.
        </p>
      </div>
    </div>
  );
};

export default GuestNotice;
