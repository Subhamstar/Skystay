import React from "react";
import { Link } from "react-router-dom";


const Menubar = ({user}) => {
  return (
    <div className="bg-white">
      <p className="text-lg text-primary font-semibold text-center">
        Hey, {user.username} 👋
      </p>
      <Link to={"/account"}>
        <p className="mt-2 hover:text-primary">Account</p>
      </Link>

      <Link to={"/account/places/new"}>
        <p className="mt-2 hover:text-primary">List place</p>
      </Link>

      <Link to={"/account/places"}>
        <p className="mt-2 hover:text-primary">Edit your listings</p>
      </Link>

      <Link to={"/account"}>
        <p className=" mt-2 bg-red-500 p-2 hover:bg-red-700 rounded-xl text-white font-semibold">
          Logout
        </p>
      </Link>
    </div>
  );
};

export default Menubar;
