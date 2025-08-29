import React from "react";
import { Link,  useParams } from "react-router-dom";
import icons from "../../../assets/icons/icons";
import Formpage from "./Formpage";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";


const Places = () => {
  const { action } = useParams();
  
  return (
    <>
    <AccountNav/>
    <div className="mt-8 w-full lg:w-5/6 md:w-5/6 m-auto">
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="bg-primary text-white py-2 px-4 rounded-full inline-flex max-w-sm gap-1"
          >
            {icons.plus}
            Add new place
          </Link>
          <PlacesPage/>
        </div>
      )}
      {action === "new" && (
        <Formpage/>
      )}
    </div>
    
    </>
  );
};

export default Places;
