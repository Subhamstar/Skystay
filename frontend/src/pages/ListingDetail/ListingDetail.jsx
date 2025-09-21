import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icons from "../../assets/icons/icons";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "./PlaceGallery";
import AddressLink from "./AddressLink";

const ListingDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/listings/${id}`).then((response) => {
      const { data } = response;
      setDetails(data);
    });
  }, [id]);

  return (
    <div className="mt-6 w-full px-4 sm:px-8 lg:w-5/6 mx-auto">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
        {details.title}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-400 transition-colors">
        {icons.location}
        <AddressLink details={details} />
      </div>

      {/* Gallery */}
      <PlaceGallery details={details} />

      {/* Main Content + Booking */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        {/* Description Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-3">About this place</h2>
          <p className="text-gray-700 leading-relaxed">{details.description}</p>

          <div className="mt-4 space-y-1 text-gray-600">
            <p>
              <span className="font-semibold">Check-In:</span> {details.checkIn}
            </p>
            <p>
              <span className="font-semibold">Check-Out:</span> {details.checkOut}
            </p>
            <p>
              <span className="font-semibold">Max Guests:</span> {details.maxGuests}
            </p>
          </div>
        </div>

        {/* Booking Widget */}
        <BookingWidget details={details} />
      </div>

      {/* Extra Info */}
      <div className="mt-8 mb-10 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 rounded-2xl p-6 shadow-inner">
        <h2 className="text-2xl font-semibold mb-3">Extra Information</h2>
        <p className="text-gray-600 leading-6">{details.extraInfo}</p>
      </div>
    </div>
  );
};

export default ListingDetail;
