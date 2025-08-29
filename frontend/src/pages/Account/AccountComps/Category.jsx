import React from "react";

const propertyCategories = [
  "Apartment",
  "House",
  "Villa",
  "Cottage",
  "Townhouse",
  "Guesthouse",
  "Bungalow",
  "Cabin",
  "Studio",
  "Treehouse",
  "Boathouse",
  "Tent",
  "Farmhouse",
  "Castle",
  "Mansion",
  "Resort",
  "Igloo",
  "Lighthouse",
  "Yurt",
  "Tipi",
  "Cave",
  "Other",
];

const PropertyDropdown = ({ category, setCategory }) => {
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <select
        className="border rounded-full w-full mt-2 p-2"
        id="propertyCategory"
        name="propertyCategory"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">Select category</option>
        {propertyCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {category && <p className="text-xl mt-2">You selected: <b className="text-2xl text-gray-600 underline">{category}</b></p>}
    </div>
  );
};

export default PropertyDropdown;
