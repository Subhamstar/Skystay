import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../assets/icons/icons";
import Formpage from "./Formpage";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";
import userContext from "../../../Context/Usercontext";
import HostVerification from "./HostVerification";
import GuestNotice from "./GuestNotice";

const Places = () => {
  const { action } = useParams();
  const { isHostMode, hostVerified, setHostVerified } = useContext(userContext);
  const [verificationComplete, setVerificationComplete] = useState(hostVerified);

  const handleVerificationComplete = () => {
    setVerificationComplete(true);
    setHostVerified(true);
  };

  // If user is in guest mode (not host mode) and tries to add a new place
  if (!isHostMode && action === "new") {
    return <GuestNotice />;
  }

  // If in host mode but not verified, show verification form
  if (isHostMode && !verificationComplete) {
    return <HostVerification onVerified={handleVerificationComplete} />;
  }

  return (
    <>
      <AccountNav />

      <div className="h-screen mt-20 w-full lg:w-5/6 md:w-5/6 mx-auto">
        {action !== "new" && (
          <div className="flex flex-col gap-6">
            {/* Add New Place Button - Only show if in host mode */}
            {isHostMode && (
              <div className="flex justify-center ">
                <Link
                  to={"/account/places/new"}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-5 rounded-full inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                >
                  {icons.plus}
                  Add New Place
                </Link>
              </div>
            )}

            {/* Guest Mode Notice - Show message if in guest mode */}
            {!isHostMode && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center max-w-2xl mx-auto">
                <p className="text-gray-700 font-semibold mb-2">
                  👤 You're in Guest Mode
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Switch to Host Mode to start listing rooms
                </p>
              </div>
            )}

            {/* Places Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlacesPage />
            </div>
          </div>
        )}

        {action === "new" && isHostMode && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Formpage />
          </div>
        )}
      </div>
    </>
  );
};

export default Places;
