import React from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../assets/icons/icons";
import Formpage from "./Formpage";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";

const Places = () => {
  const { action } = useParams();

  return (
    <>
      <AccountNav />

      <div className="h-screen mt-20 w-full lg:w-5/6 md:w-5/6 mx-auto">
        {action !== "new" && (
          <div className="flex flex-col gap-6">
            {/* Add New Place Button */}
            <div className="flex justify-center ">
              <Link
                to={"/account/places/new"}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-5 rounded-full inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                {icons.plus}
                Add New Place
              </Link>
            </div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlacesPage />
            </div>
          </div>
        )}

        {action === "new" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Formpage />
          </div>
        )}
      </div>
    </>
  );
};

export default Places;
