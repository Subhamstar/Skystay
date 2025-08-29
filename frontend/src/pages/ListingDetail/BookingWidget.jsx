import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import userContext from "../../Context/Usercontext";

const BookingWidget = ({ details }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }



  async function bookingThisPlace(e) {
    e.preventDefault();
    const data = {
      checkIn,
      checkOut,
      name,
      email,
      mobile,
      numberOfGuests,
      place: details._id,
      price: numberOfNights * details.price * 1.18,
      token: user.token,
    };
    try {
      const response = await axios.post("/api/booking", data);
      const bookingId = response.data._id;
      setRedirect(`/account/booking/${bookingId}`);
    } catch (error) {
      console.log("error sending request", error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-100 shadow p-4 rounded-2xl ">
      <div className="text-xl text-center">
        Price: {details.price}/- per night
      </div>
      <div className="border rounded-2xl my-4">
        <div className="flex flex-col min-[500px]:flex-row">
          <div className=" py-3 px-2 ">
            <label htmlFor="checkin">Check-In</label>
            <input
              className="w-full px-4 rounded-2xl"
              type="date"
              id="checkin"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-2 border-l">
            <label htmlFor="checkout">Check-Out</label>
            <input
              className="w-full px-4 rounded-2xl"
              type="date"
              id="checkout"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 border-t">
          <label htmlFor="number">Number of guests</label>
          <input
            className="w-full rounded-full py-1 px-2"
            type="number"
            value={numberOfGuests}
            max={details.maxGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="px-4  ">
            <label htmlFor="name">Your Full Name</label>
            <input
              className="w-full rounded-full py-1 px-2"
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Your Email Address</label>
            <input
              className="w-full rounded-full py-1 px-2"
              type="email"
              id="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="mobile">Your Mobile Number</label>
            <input
              className="w-full rounded-full py-1 px-2"
              type="tel"
              id="mobile"
              placeholder="+91XXXXXXXXXX"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
        )}
      </div>
      <button
        disabled={!name || !email || !mobile}
        onClick={(e) => bookingThisPlace(e)}
        className={`bg-primary text-white font-semibold w-full py-2 rounded-2xl mt-1 disabled:opacity-70`}
      >
        Book this place
        {numberOfNights > 0 && (
          <span className="text-xl">
            {" "}
            ₹{numberOfNights * details.price * 1.18}{" "}
            <span className="text-xs">Including Taxes</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
