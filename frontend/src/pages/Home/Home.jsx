// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Filter from "../Search/FIlter";
// import Searchcontext from "../../Context/Searchcontext";

// const Home = () => {
//   const { searchResult, reload } = useContext(Searchcontext);
//   const [filter, setFilter] = useState("");
//   const [listing, setListing] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const navigate = useNavigate()

//   useEffect(() => {
//     axios.get("/api/listings").then((response) => {
//       const { data } = response;
//       setListing(data);
//     });
//   }, [reload]);

//   useEffect(() => {
//     if (filter) {
//       axios.get(`/api/filter/${filter}`).then((response) => {
//         const { data } = response;
//         setListing(data);
//       });
//     }
//     setFilter("");
//   }, [filter]);

//   useEffect(() => {
//     if (searchResult.length > 0) {
//       setListing(searchResult);
//     }
//   }, [searchResult]);

//   return (
//     <div>
//       <Filter setFilter={setFilter} setToggle={setToggle} toggle={toggle} />
//       <div>Popular Rooms in Chandigarg</div>
//       {listing?.length > 0 && (
//         <div className=" m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 mt-8">
        
//           {listing?.map((list) => (
//             <Link to={`/listings/${list._id}`} key={list._id}>
//               <div className="bg-gray-500 mb-2 rounded-2xl flex">
//                 <img
//                   src={list.photos[0]}
//                   alt="listing-image"
//                   className="object-cover rounded-xl aspect-square "
//                 />
//               </div>
//               <h3 className="font-bold">{list.address}</h3>
//               <p className="text-sm text-gray-500 truncate">
//                 {list.title.slice(0, 25)}
//                 <b>...more</b>
//               </p>

//               {toggle ? (
//                 <h4 className="mt-1 ">
//                   <b>₹{list.price * 1.18}</b> <span> night</span>
//                 </h4>
//               ) : (
//                 <h4 className="mt-1 ">
//                   <b>₹{list.price}</b> <span> /Night</span>
//                 </h4>
//               )}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;




import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../Search/FIlter";
import Searchcontext from "../../Context/Searchcontext";

const Home = () => {
  const { searchResult, reload } = useContext(Searchcontext);
  const [filter, setFilter] = useState("");
  const [listing, setListing] = useState([]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      const { data } = response;
      setListing(data);
    });
  }, [reload]);

  useEffect(() => {
    if (filter) {
      axios.get(`/api/filter/${filter}`).then((response) => {
        const { data } = response;
        setListing(data);
      });
    }
    setFilter("");
  }, [filter]);

  useEffect(() => {
    if (searchResult.length > 0) {
      setListing(searchResult);
    }
  }, [searchResult]);

  const listingsByCity = listing.reduce((acc, item) => {
    const city = item.city || "Others";
    if (!acc[city]) acc[city] = [];
    acc[city].push(item);
    return acc;
  }, {});
  
  return (
    <div>
      <Filter setFilter={setFilter} setToggle={setToggle} toggle={toggle} />
      <div className="text-2xl font-bold mt-4 mb-4">{"Popular Homes by City >"}</div>

      {Object.keys(listingsByCity).map((city) => (
        <div key={city} className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">{city}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
            {listingsByCity[city].map((list) => (
              <Link to={`/listings/${list._id}`} key={list._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  <img
                    src={list.photos[0]}
                    alt="listing-image"
                    className="object-cover rounded-xl aspect-square"
                  />
                </div>
                <h3 className="font-bold">{list.address}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {list.title.slice(0, 25)} <b>...more</b>
                </p>
                <div className="flex justify-between items-center mt-1">
                <h4>
                  <b>₹{toggle ? list.price * 1.18 : list.price}</b> <span> /Night</span>
                </h4>
                <p className="text-sm text-yellow-600 font-semibold">
                  ⭐ {list.rating || "4.5"}
                </p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
