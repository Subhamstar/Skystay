import React from "react";

const AddressLink = ({details}) => {
  return (
    <a
      target="_blank"
      href={`https://www.google.com/maps/place/${details.address}`}
      className="text-sm font-bold underline"
    >
      {details.address}
    </a>
  );
};

export default AddressLink;
