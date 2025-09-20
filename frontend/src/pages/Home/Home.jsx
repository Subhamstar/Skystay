import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../Search/FIlter";
import Searchcontext from "../../Context/Searchcontext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const { searchResult, reload } = useContext(Searchcontext);
  const [filter, setFilter] = useState("");
  const [listing, setListing] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      setListing(response.data);
    });
  }, [reload]);

  useEffect(() => {
    if (filter) {
      axios.get(`/api/filter/${filter}`).then((response) => {
        setListing(response.data);
      });
    }
    setFilter("");
  }, [filter]);

  useEffect(() => {
    if (searchResult.length > 0) {
      setListing(searchResult);
    }
  }, [searchResult]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((fid) => fid !== id);
      } else {
        updated = [...prev, id];
      }
      setListing((prevListing) => {
        const sorted = [...prevListing].sort((a, b) => {
          const aFav = updated.includes(a._id) ? 1 : 0;
          const bFav = updated.includes(b._id) ? 1 : 0;
          return bFav - aFav;
        });
        return sorted;
      });
      return updated;
    });
  };

  const listingsByCity = listing.reduce((acc, item) => {
    const city = item.city || "Others";
    if (!acc[city]) acc[city] = [];
    acc[city].push(item);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-white to-cyan-200 animate-gradient" />

      {/* Floating blur blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-400 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-400 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-blue-400 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Twinkling dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars" />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
        <Filter setFilter={setFilter} setToggle={setToggle} toggle={toggle} />

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-extrabold mt-8 mb-10 text-gray-800 text-center drop-shadow-lg"
        >
          ✨ Explore Stunning Homes by City
        </motion.h1>

        {Object.keys(listingsByCity).map((city) => (
          <div key={city} className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700 border-l-4 border-indigo-500 pl-3 drop-shadow-md"
            >
              {city}
            </motion.h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {listingsByCity[city].map((list, index) => (
                <motion.div
                  key={list._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group rounded-3xl overflow-hidden backdrop-blur-md bg-white/70 border border-transparent hover:border-indigo-400 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    {/* Image */}
                    <div className="relative w-full aspect-square overflow-hidden">
                      <img
                        src={list.photos[0]}
                        alt="listing"
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(list._id);
                        }}
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
                      >
                        {favorites.includes(list._id) ? (
                          <FaHeart
                            size={22}
                            className="text-pink-600 drop-shadow-md animate-bounce"
                          />
                        ) : (
                          <FaRegHeart size={22} className="text-gray-700" />
                        )}
                      </button>
                    </div>

                    {/* Content */}
                    <Link to={`/listings/${list._id}`} className="block p-5">
                      <h3 className="font-bold text-gray-900 text-lg truncate">
                        {list.address}
                      </h3>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {list.title.slice(0, 40)} <b>...more</b>
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <h4 className="text-gray-900 font-semibold text-lg">
                          ₹{toggle ? (list.price * 1.18).toFixed(0) : list.price}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            / Night
                          </span>
                        </h4>
                        <p className="text-sm text-yellow-600 font-semibold flex items-center">
                          ⭐ {list.rating || "4.5"}
                        </p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
