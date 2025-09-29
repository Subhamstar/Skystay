import React, { useState } from "react";
import icons from "../../assets/icons/icons";

const PlaceGallery = ({ details }) => {
  const [showPhotos, setShowPhotos] = useState(false);

  if (showPhotos) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 overflow-y-auto">
        <div className="p-6 md:p-10">
          {/* Header with Title + Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white text-2xl font-bold">{details.title}</h1>
            <button
              onClick={() => setShowPhotos(false)}
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-black px-3 py-1.5 rounded-lg font-semibold shadow transition"
            >
              {icons.cross}
              Close
            </button>
          </div>

          {/* Photos Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {details?.photos?.map((photo, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={photo}
                  alt={`photo-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full gap-2 grid grid-cols-[2fr_1fr] mt-6 rounded-3xl overflow-hidden relative shadow-xl">
      {/* Main Photo */}
      <div className="overflow-hidden">
        {details?.photos?.[0] && (
          <img
            onClick={() => setShowPhotos(true)}
            className="aspect-square object-cover cursor-pointer w-full hover:scale-105 transition-transform duration-300"
            src={details?.photos[0]}
            alt="image"
          />
        )}
      </div>

      {/* Side Photos */}
      <div className="grid">
        {details?.photos?.[1] && (
          <img
            onClick={() => setShowPhotos(true)}
            className="aspect-square cursor-pointer w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={details?.photos[1]}
            alt="image"
          />
        )}
        <div className="overflow-hidden">
          {details?.photos?.[2] && (
            <img
              onClick={() => setShowPhotos(true)}
              className="aspect-square object-cover cursor-pointer w-full h-full hover:scale-105 transition-transform duration-300"
              src={details?.photos[2]}
              alt="image"
            />
          )}
        </div>
      </div>

      {/* Show all photos button */}
      <button
        className="absolute flex gap-2 items-center bottom-3 right-3 border px-4 py-1.5 rounded-lg bg-white/90 hover:bg-white text-black font-semibold shadow-lg transition"
        onClick={() => setShowPhotos(true)}
      >
        {icons.list}
        Show all photos
      </button>
    </div>
  );
};

export default PlaceGallery;
