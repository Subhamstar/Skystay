import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PerksLable from "./PerksLable";
import axios from "axios";
import Photos from "./Photos";
import PropertyDropdown from "./Category";
import userContext from "../../../Context/Usercontext";

const Formpage = () => {
  const { id } = useParams();
  const {user} =  useContext(userContext)
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [city, setCity] = useState(""); //
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  function inputHeader(text) {
    return <h2 className="text-2xl ">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div className="mt-4">
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function savePlace(e) {
    const token = user.token
    e.preventDefault();
    const placeData = {
      title,
      price,
      address,
       city, //
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      category,
      token
    };
    if (id) {
      await axios.put("/api/places", { id, ...placeData });
    } else {
      await axios.post("/api/places", placeData);
    }

    navigate("/account/places");
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      setCategory(data.category);
      setCity(data.city); //

    });
  }, [id]);

  return (
    <form onSubmit={savePlace} className="mb-8 w-full sm:w-5/6 md:w-3/5 m-auto bg-gray-100 p-4 rounded-3xl mt-4">
      {preInput(
        "Title",
        "Title for your place should be short and catchy as in advertisement"
      )}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title,for example for my appartment"
        className="w-full rounded-full px-4 py-2 border mt-2 "
      />
      {preInput("Address", "Address to this place")}
      <div className="grid sm:grid-cols-2 gap-4">
          <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Address"
          className="w-full rounded-full px-4 py-2 border mt-2"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="City(Chandigarh/Kolkata)"
          className="w-full rounded-full px-4 py-2 border mt-2"
        />
      </div>
      {preInput("Photos", "More = better")}
      <Photos photos={photos} setPhotos={setPhotos} />
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-2xl px-4 py-2  w-5/6 lg:w-5/6 md:w-5/6 h-56 mt-2"
            placeholder="Description of the place"
          />
        </div>
        <div>
        {preInput("Category", "Choose the property category")}
          <PropertyDropdown category={category} setCategory={setCategory} />
        </div>
      </div>

      <div>
        {preInput("Perks", "Select all the perks of your place")}
        <PerksLable selected={perks} onChange={setPerks} />
      </div>
      <div>
        {preInput(
          "Check IN & OUT times",
          "Add check in add out times remember to have time window for cleaning the room between guests"
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          <div>
            <h3>Check in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="number"
              placeholder="01"
              max={"24"}
              min={"0"}
              className="border w-full mt-2 px-4 py-2 rounded-full"
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="number"
              max={"24"}
              min={"0"}
              placeholder="12"
              className="border w-full mt-2 px-4 py-2 rounded-full"
            />
          </div>
          <div>
            <h3>Number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="border w-full mt-2 px-4 py-2 rounded-full"
            />
          </div>
          <div>
            <h3 className="font-semibold">Price</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border w-full mt-2 px-4 py-2 rounded-full"
            />
          </div>
        </div>
      </div>

      <div>
        {preInput("Extra info", "house rules etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="border rounded-2xl px-4 py-2 w-5/6 lg:w-1/2 md:w-5/6 h-56"
          placeholder="Extra info"
        />
      </div>

      <button className="min-w-56 rounded-full bg-primary text-white py-2 text-xl font-bold">
        Save
      </button>
    </form>
  );
};

export default Formpage;
