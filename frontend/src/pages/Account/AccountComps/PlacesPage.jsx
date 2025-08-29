import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Placeimg from "../../Booking/Placeimg";
import userContext from "../../../Context/Usercontext";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const {user} =  useContext(userContext)

  useEffect(() => {
    axios.get(`/api/places?token=${user.token}`).then(({ data }) => setPlaces(data));
  }, []);

  return (
    <div className="w-full text-start mt-4">
      {places?.map((place) => (
        <Link to={`/account/places/${place?._id}`} key={place._id}>
          <div className="bg-gray-200 p-4 rounded-2xl flex gap-4 mt-4 w-full">
            <div className="min-w-32 max-w-32 h-24 bg-gray-300 grow flex">
              <Placeimg place={place}/>
            </div>
            <div className="shrink grow-0">
              <h2 className="text-xl font-semibold">{place.title}</h2>
              <p className="text-sm mt-2">
                {place.description.slice(0, 100)} <b>...more</b>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PlacesPage;
