import React, { useContext } from "react";
import userContext from "../../../Context/Usercontext";
import AccountNav from "./AccountNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate()

  async function handleLogout() {
    await axios.post("/api/logout");
    localStorage.removeItem("userInfo")
    setUser(null);
    navigate("/")
  }


  // return (
  //   <>
  //   <AccountNav/>
  //   <div className="text-center max-m-lg mx-auto my-6">
  //     Logged in as {user.username} ({user.email}) <br />
  //     <button
  //       className="bg-primary mx-w-sm text-white px-4 py-2 rounded-full mt-2"
  //       onClick={handleLogout}
  //     >
  //       Logout
  //     </button>
  //   </div>
  //   </>
  // );
return (
  <>
    <AccountNav />
    {/* <div className="h-screen"></div> */}
    <div className="max-w-xl mx-auto mt-20 ">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary shadow-sm">
          <img
            // src={icons.accountProfile}
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">
            Name : {user.username}
          </h2>
          <p className="text-gray-600">Mail id : {user.email}</p>

          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </>
);


};

export default Profile;
