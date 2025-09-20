import React, { useContext, useState, useRef, useEffect } from "react";
import icons from "../../assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../Context/Usercontext";
import Searchcontext from "../../Context/Searchcontext";
import axios from "axios";
import Menubar from "./Menubar";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, setSearchResult, reload, setReload } =
    useContext(Searchcontext);
  const { user } = useContext(userContext);

  const [searchClicked, setSearchClicked] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const menuRef = useRef(null);

  const handleSearchBtnClick = (e) => {
    e.preventDefault();
    setSearchClicked(!searchClicked);
  };

  const reRender = () => {
    setReload(!reload);
    navigate("/");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      setSearchResult([]);
      const response = await axios.get("/api/search", {
        params: { searchTerm },
      });
      setSearchResult(response.data);
    }
    setSearchTerm("");
    setSearchClicked(false);
  };

  const navLinks = [
    { name: "Home", to: "/", key: "home" },
    { name: "Bookings", to: "/account/booking", key: "bookings" },
    { name: "Add New", to: "/account/places/new", key: "add" },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="backdrop-blur-md bg-gradient-to-r from-purple-50 via-white to-blue-50 shadow-lg sticky top-0 z-50 px-6 py-3 flex justify-between items-center transition-all duration-500">
      
      {/* Logo */}
      <div
        onClick={reRender}
        className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        {icons.logo}
        <span className="font-bold text-xl max-[630px]:hidden text-purple-600 hover:text-pink-500 transition-colors duration-300">
          Abash
        </span>
      </div>

      {/* Search Box / Nav Links */}
      {!searchClicked ? (
        <motion.div
          className="flex border border-gray-300 rounded-full py-2 px-4 gap-4 shadow-md shadow-gray-300 bg-white hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.03 }}
        >
          {navLinks.map((link) => (
            <div
              key={link.key}
              className="relative cursor-pointer px-2 py-1 group"
              onClick={() => {
                navigate(link.to);
                setActiveLink(link.key);
              }}
            >
              <span className="transition-colors duration-300 text-gray-700 group-hover:text-purple-600 font-medium">
                {link.name}
              </span>
              {activeLink === link.key && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                />
              )}
            </div>
          ))}

          <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:scale-110 hover:shadow-lg transition-transform duration-300"
            onClick={handleSearchBtnClick}
          >
            {icons.search}
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="flex border border-gray-300 rounded-full gap-4 shadow-md mx-2 shadow-gray-300 w-1/2 max-[380px]:w-full relative transition-all duration-300 max-[630px]:w-5/6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
        >
          <input
            type="text"
            placeholder="Search your destination"
            className="w-full py-2 px-4 rounded-full border-none pr-16 text-gray-700 max-[380px]:w-full max-[630px]:w-full outline-none focus:ring-2 focus:ring-pink-500 transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute right-4 bottom-1 p-2 text-purple-600 text-xl hover:scale-110 transition-transform duration-200"
            onClick={handleSearch}
          >
            {icons.search}
          </button>
        </motion.div>
      )}

      {/* Hamburger & Profile */}
      <div className="flex justify-center items-center border border-gray-300 rounded-full py-1 px-2 md:py-2 md:px-4 gap-2 text-xs md:text-md relative">
        
        {/* Animated Hamburger */}
        <button
          onClick={() => setMenu(!menu)}
          className="relative w-6 h-6 flex flex-col justify-between items-center cursor-pointer"
        >
          <motion.span
            animate={menu ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menu ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menu ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded"
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {menu && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl z-50 md:w-56 text-base p-4 border border-purple-200"
            >
              {!user && (
                <Link to={"/login"}>
                  <p className="hover:text-purple-600 transition">Login</p>
                </Link>
              )}
              {user && <Menubar user={user} />}
            </motion.div>
          )}
        </AnimatePresence>

        {!user && (
          <Link
            to={"/login"}
            className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full border border-purple-500 hover:shadow-lg transition p-2"
          >
            {icons.profile}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
