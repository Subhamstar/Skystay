import React, { useState } from "react";
import icons from "../../assets/icons/icons";

const PlaceGallery = ({ details }) => {
  const [showPhotos, setShowPhotos] = useState(false);

  if (showPhotos) {
    return (
      <div className="w-full absolute bg-black inset-0 min-h-screen z-50">
        <div className="p-8 bg-black grid gap-4">
          <div>
            <h1 className="text-white text-2xl mr-48">{details.title}</h1>
            <button
              onClick={() => {
                setShowPhotos(false);
              }}
              className="fixed right-12 top-10 text-black flex gap-1 bg-gray-400 px-2 py-1 rounded-lg items-center font-semibold shadow shadow-gray-500"
            >
              {icons.cross}Close photos
            </button>
          </div>
          {details?.photos?.length > 0 &&
            details.photos.map((photo) => (
              <div className="" key={photo}>
                <img
                  src={photo}
                  alt="image"
                  className="sm:w-full md:w-4/5 m-auto"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full gap-2 grid grid-cols-[2fr_1fr] mt-4 rounded-3xl overflow-hidden relative">
      <div>
        {details?.photos?.[0] && (
          <img
            onClick={() => {
              setShowPhotos(true);
            }}
            className="aspect-square object-cover cursor-pointer w-full"
            src={details?.photos[0]}
            alt="image"
          />
        )}
      </div>
      <div className="grid">
        {details?.photos?.[1] && (
          <img
            onClick={() => {
              setShowPhotos(true);
            }}
            className="aspect-square cursor-pointer w-full h-full object-cover"
            src={details?.photos[1]}
            alt="image"
          />
        )}
        <div className="overflow-hidden">
          {details?.photos?.[1] && (
            <img
              onClick={() => {
                setShowPhotos(true);
              }}
              className="aspect-square object-cover relative top-2 cursor-pointer w-full h-full"
              src={details?.photos[2]}
              alt="image"
            />
          )}
        </div>
      </div>
      <button
        className="absolute flex gap-1 items-center bottom-2 right-2 border-2 border-black px-4 py-1 rounded-md bg-white font-semibold"
        onClick={() => setShowPhotos(true)}
      >
        {icons.list}
        Show all photos
      </button>
    </div>
  );
};

export default PlaceGallery;
