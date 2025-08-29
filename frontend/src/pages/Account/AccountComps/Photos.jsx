import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import icons from "../../../assets/icons/icons";
import axios from "axios";

const Photos = ({ photos, setPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/api/upload-by-link", {
      link: photoLink,
    });
    setPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: response } = await axios.post("api/upload", data, {  //change
      headers: { "Content-Type": "multipart/form-data" },
       withCredentials: true,
       timeout: 10000 ,
    });
     if (Array.isArray(response.urls)) {
      setPhotos((prev) => [...prev, ...response.urls]);
    } else {
      console.error("❌ Upload failed or response malformed:", response);
    }
    setPhotoLink("");
  }

  function imageDelete(e, filelink){
    e.preventDefault()
    setPhotos([...photos.filter(photo=> photo !== filelink)])
  }

  function staredImage(e, filelink){
    e.preventDefault()
    setPhotos([filelink, ...photos.filter(photo=> photo !== filelink)])
  }



  return (
    <>
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          type="text"
          placeholder="Add using a link......jpg png"
          className="w-full rounded-full px-4 py-2 border mt-2"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-500 text-white px-4 py-2 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
        {photos.length > 0 &&
          photos.map((link) => (
            <div className="h-32 flex relative" key={uuidv4()}>
              <img
                className="rounded-2xl w-full object-cover"
                src={link}
                alt="image"
              />
              <button
                onClick={(e) => {
                  imageDelete(e, link);
                }}
                className="absolute bottom-1 right-2 bg-black bg-opacity-60 rounded-xl py-1 px-1 "
              >
                {icons.delete}
              </button>
              {photos[0] === link ? (
                <button
                onClick={(e) => {
                    staredImage(e, link);
                  }}
                  className="absolute bottom-1 left-2 bg-black bg-opacity-60 rounded-xl py-1 px-1 "
                >
                  {icons.checkedstar}
                </button>
              ) : (
                <button
                onClick={(e) => {
                    staredImage(e, link);
                  }}
                  className="absolute bottom-1 left-2 bg-black bg-opacity-60 rounded-xl py-1 px-1 "
                >
                  {icons.star}
                </button>
              )}
            </div>
          ))}
        <label className=" cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 w-auto flex flex-col justify-center items-center">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          {icons.upload}
          Upload
        </label>
      </div>
    </>
  );
};

export default Photos;
