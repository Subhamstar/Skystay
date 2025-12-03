import React, { useContext } from "react";
import userContext from "../../../Context/Usercontext";
import AccountNav from "./AccountNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("userInfo");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) return null;

  return (
    <>
      <AccountNav />

      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-lg flex-shrink-0">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {user.username}
              </h1>
              <p className="text-gray-500 mb-4">{user.email}</p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition font-medium"
                >
                  Logout
                </button>

                {/* Show Host Dashboard button only for users with host/admin role */}
                {(user?.role === "admin" || user?.role === "host") && (
                  <button
                    className="px-6 py-2 bg-amber-600 text-white rounded-full shadow-md hover:bg-amber-700 transition flex items-center gap-2 font-medium"
                    onClick={() => navigate("/host")}
                  >
                    🏠 Host Dashboard
                  </button>
                )}

                <button
                  className="px-6 py-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition flex items-center gap-2 font-medium"
                  onClick={() => navigate("/account/edit")}
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Optional Stats Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">5</h2>
              <p className="text-gray-500 mt-1">Bookings</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">12</h2>
              <p className="text-gray-500 mt-1">Favorites</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">3</h2>
              <p className="text-gray-500 mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
