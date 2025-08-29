import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../ListingDetail/AddressLink";
import PlaceGallery from "../ListingDetail/PlaceGallery";
import BookingDates from "./BookingDates";
import userContext from "../../Context/Usercontext";

const SingleBookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const {user} =  useContext(userContext)

  useEffect(() => {
    if (id) {
      axios.get(`/api/booking?token=${user.token}`).then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8 w-full lg:w-3/5 md:w-5/6 m-auto ">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink details={booking.place} />
      <div className="bg-gray-200 p-4 mb-4 mt-2 rounded-2xl grid grid-cols-[4fr_1fr] ">
        <div>
          <h2 className="text-xl">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="flex flex-col items-center justify-center bg-primary rounded-3xl text-white max-[600px]:px-4">
          <h2 className=" text-base sm:text-base ">Total Price:</h2>
          <h2 className="text-2xl font-semibold">₹{booking.price}/-</h2>
        </div>
      </div>
      <PlaceGallery details={booking.place} />
    </div>
  );
};

export default SingleBookingPage;
