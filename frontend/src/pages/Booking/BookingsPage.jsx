// import React, { useContext, useEffect, useState } from "react";
// import Account from "../Account/Account";
// import axios from "axios";
// import Placeimg from "./Placeimg";
// import icons from "../../assets/icons/icons";
// import BookingDates from "./BookingDates";
// import userContext from "../../Context/Usercontext";

// const BookingsPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const {user} =  useContext(userContext)
  
//   useEffect(() => {
//     axios
//       .get(`/api/booking?token=${user.token}`)
//       .then((response) => {
//         const { data } = response;
//         setBookings(data);
//       });
//   }, []);

//   return (
//     <>
//       <Account />
//       <div className="flex flex-col items-center mt-4">
//         {bookings?.length > 0 &&
//           bookings.map((booking) => (
//             <div
//               className="flex gap-4 bg-gray-200 rounded-2xl w-full lg:w-5/6 overflow-hidden mt-4"
//               key={booking._id}
//             >
//               <div className="w-48 flex">
//                 <Placeimg
//                   place={booking.place}
//                   className={"object-cover grow !h-full w-full "}
//                 />
//               </div>
//               <div className="py-3 pr-3 grow">
//                 <h2 className=" text-sm sm:text-xl">{booking.place.title}</h2>
//                 <BookingDates booking={booking} />
//                 <div className="text-sm sm:text-xl flex gap-2 mt-1">
//                   {icons.card}
//                   Total price: ₹{booking.price}
//                  <button className="px-10 ml-20 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out">
//                             Cancle
//                   </button>
//                  <button className="px-10 ml-20 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out">
//                             Pay now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default BookingsPage;


import React, { useContext, useEffect, useState } from "react";
import Account from "../Account/Account";
import axios from "axios";
import Placeimg from "./Placeimg";
import icons from "../../assets/icons/icons";
import BookingDates from "./BookingDates";
import userContext from "../../Context/Usercontext";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    axios
      .get(`/api/booking?token=${user.token}`)
      .then((response) => {
        const { data } = response;
        setBookings(data);
      });
  }, []);

  // ✅ Cancel Booking
  const handleCancel = async (bookingId) => {
    console.log("Trying to cancel booking:", bookingId);
    try {
      await axios.delete(`/api/booking/${bookingId}?token=${user.token}`);
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  return (
    <>
      <Account />
      <div className="h-screen flex flex-col items-center mt-4">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              className="flex gap-4 bg-gray-200 rounded-2xl w-full lg:w-5/6 overflow-hidden mt-4"
              key={booking._id}
            >
              <div className="w-48 flex">
                <Placeimg
                  place={booking.place}
                  className={"object-cover grow !h-full w-full "}
                />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-sm sm:text-xl">{booking.place.title}</h2>
                <BookingDates booking={booking} />
                <div className="text-sm sm:text-xl flex gap-2 mt-1 items-center">
                  {icons.card}
                  Total price: ₹{booking.price}
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="ml-4 bg-pink-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button className="ml-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out">
                    Pay now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BookingsPage;
