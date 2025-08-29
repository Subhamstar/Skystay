// const { cloudinary } = require("../cloudinary");

// module.exports.uploadByLink = async (req, res) => {
//   const { link } = req.body;
//   try {
//     const response = await cloudinary.uploader.upload(link, {
//       folder: "skystay",
//     });
//     res.json(response.url);
//   } catch (error) {
//     console.log("error occured in link upload,", error);
//   }
// };

// module.exports.uploadFromDevice = async (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path } = req.files[i];
//     const response = await cloudinary.uploader.upload(path, {
//       folder: "skystay",
//     });
//     const { url } = response;
//     uploadedFiles.push(url);
//   }
//   res.json(uploadedFiles);
// };

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
module.exports.uploadByLink = async (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res.status(400).json({ success: false, message: "Image link is required" });
  }

  try {
    const result = await cloudinary.uploader.upload(link, {
      folder: "skystay",
    });
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error(" Error uploading via link:", error);
    res.status(500).json({ success: false, message: "Link upload failed" });
  }
};

// Upload from device (form upload)
module.exports.uploadFromDevice = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No files uploaded" });
  }

  const uploadedFiles = [];

  try {
    for (let i = 0; i < req.files.length; i++) {
      const filePath = req.files[i].path;

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "skystay",
      });

      uploadedFiles.push(result.secure_url);

      fs.unlinkSync(filePath);
    }

    res.json({ success: true, urls: uploadedFiles });
  } catch (error) {
    console.error("Error uploading from device:", error);
    res.status(500)
      .json({ 
        success: false, 
        message: "Device upload failed" 
      });
  }
};
