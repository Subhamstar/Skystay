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
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/listings/${id}`).then((response) => {
      const { data } = response;
      setDetails(data);
    });
  }, [id]);

  return (
    <div className="mt-4 w-full px-0 sm:px-8 lg:w-5/6 mx-auto ">
      <h1 className="text-2xl font-semibold">{details.title}</h1>
      <div className="flex gap-1 items-center ">
        {icons.location}
        <AddressLink details={details}/>
      </div>
      < PlaceGallery details={details}/>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] my-4">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-xl">Description</h2>
            <p>{details.description}</p>
          </div>
          Check-In: <b>{details.checkIn}</b>
          <br />
          Check-Out: <b>{details.checkOut}</b>
          <br />
          Max number of guests: <b>{details.maxGuests}</b>
        </div>
        <BookingWidget details={details} />
      </div>
      <div className="bg-white pt-4 border-t">
        <h2 className="font-semibold text-xl">ExtraInfo</h2>
        <div className="text-sm text-gray-500 leading-4 mb-4 mt-2">
          {details.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
