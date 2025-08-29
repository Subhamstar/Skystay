import React, { useContext } from "react";
import icons from "../../../assets/icons/icons";
import { Link, useLocation } from "react-router-dom";
import userContext from "../../../Context/Usercontext";


const AccountNav = () => {
  const{user} = useContext(userContext)
    const {pathname }= useLocation()
    let subpage = pathname.split("/")?.[2]
    if(subpage === undefined){
        subpage = "profile";
    }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 inline-flex gap-2 max-[630px]:text-xs flex items-center justify-center max-[630px]:px-2";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200 text-black rounded-full";
    }
    return classes;
  }

  return (
    <nav className="w-full flex justify-center items-center mt-8 gap-2 max-[630px]-text-xs ">
      <Link to={!user? "/register":"/account"} className={linkClasses("profile")}>
        {icons.accountProfile}
        <span className="">Profile</span> 
      </Link>
      <Link to={!user ? "/register" :"/account/booking"} className={linkClasses("booking")}>
        {icons.bookings}
        Bookings
      </Link>
      <Link to={!user ? "/register":"/account/places"} className={linkClasses("places")}>
        {icons.places}
        Accommodations
      </Link>
    </nav>
  );
};

export default AccountNav;
