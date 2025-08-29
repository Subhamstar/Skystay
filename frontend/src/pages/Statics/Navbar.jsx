import React, {  useContext, useState } from "react";
import icons from "../../assets/icons/icons";
import { Link } from "react-router-dom";
import userContext from "../../Context/Usercontext";
import Searchcontext from "../../Context/Searchcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menubar from "./Menubar";


const Navbar = () => {
  const navigate = useNavigate()
  const { searchTerm, setSearchTerm, setSearchResult, reload, setReload } =
    useContext(Searchcontext);

  const [searchClicked, setSearchClicked] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user } = useContext(userContext);

  const handleSearchBtnClick = (e) => {
    e.preventDefault();
    setSearchClicked(!searchClicked);
  };

  const reRender = ()=>{
    setReload(!reload)
    navigate("/")
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      setSearchResult([]);
      const response = await axios.get("/api/search", {
        params: {
          searchTerm,
        },
      });
      const { data } = response;
      setSearchResult(data);
    }

    setSearchTerm("");
    setSearchClicked(!searchClicked);
  };

  const handleMenubar = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  return (
    <header className="flex justify-between max-[380px]:gap-4 ">
      <div onClick={reRender} className="flex items-center gap-1 max-[200px]:hidden cursor-pointer">
        {icons.logo}
        <span className="font-bold text-xl max-[630px]:hidden">Skystay</span>
      </div>

      {!searchClicked ? (
        <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300 ">
          <div onClick={reRender} className="cursor-pointer" >
            <div>Anywhere</div>
          </div>
          <div className="border-l border-gray-300 max-[500px]:hidden"></div>
          <Link to={"/account/booking"}>
          <div className="max-[500px]:hidden">Your Bookings</div>
          
          </Link>
          <div className="border-l border-gray-300"></div>
          <Link to={"/account/places/new"}
            className="max-[400px]:hidden"
          >
            <div className="text-gray-500 ">Add New</div>
          </Link>
          <button
            className="bg-primary text-white p-1 rounded-full"
            onClick={(e) => handleSearchBtnClick(e)}
          >
            {icons.search}
          </button>
        </div>
      ) : (
        <div className="flex border border-gray-300 rounded-full gap-4 shadow-md mx-2 shadow-gray-300 w-1/2 max-[380px]:w-full relative transition-all delay-700 max-[630px]:w-5/6">
          <input
            type="text"
            placeholder="Search your destination"
            className="w-full py-2 px-4 rounded-full border-none pr-16 text-gray-700 max-[380px]:w-full max-[630px]:w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute right-4 bottom-1 p-2 text-primary text-xl"
            onClick={(e) => handleSearch(e)}
          >
            {icons.search}
          </button>
        </div>
      )}
      <div className="flex justify-center items-center max-[500px]:border-none border border-gray-300 rounded-full py-1 px-1 md:py-2 md:px-4 gap-2 overflow-hidden text-xs md:text-md">
        <button onClick={(e) => handleMenubar(e)}>{icons.hamburger}</button>

        {menu && (
          <div className="absolute top-16 right-5 bg-gray-100 shadow-md shadow-gray-300 rounded-2xl z-50 md:w-56 text-base p-4">
            {!user && (
              <Link to={"/login"}>
                <p className="hover:text-primary">Login</p>
              </Link>
            )}
            {user && (
             <Menubar user={user}/>
            )}
          </div>
        )}
        {!user && (
          <Link
            to={"/login"}
            className="bg-gray-500 rounded-full border border-gray-500  max-[350px]:text-xs"
          >
            {icons.profile}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
