if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const port = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const auth = require("./controller/auth.js");
const profile = require("./controller/profile.js");
const upload = require("./controller/upload.js");
const listing = require("./controller/listing.js");
const booking = require("./controller/booking.js");
const search = require("./controller/search.js");

const corsOptions = {
  // origin: "http://localhost:5173",  //edit this as a frontend
  origin: "https://roombooking-frontend-z9s9.onrender.com/",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions))

mongoose.connect(process.env.MONGODB_URL)
.then((conn )=>{
  console.log(`Mongodb connected at : ${conn.connection.host}`)
})
.catch((e)=>{
  console.log("Connection Error");
});

// middlewares
app.use(express.json());
app.use("/uploadS", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const photoMiddleware = multer({ dest: "uploads" });

// personal details
app.get("/test", (req, res)=>{
  res.send("hello")
})
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.post("/api/logout", auth.logout);

// profile details
app.get("/api/profile", profile.getProfile);
app.get("/api/places", profile.myListedPlaces);
app.post("/api/places", profile.uploadNewPlace);
app.put("/api/places", profile.editPlaceDetails);
app.get("/api/places/:id", profile.placeInDetail);

// uploading images
app.post("/api/upload-by-link", upload.uploadByLink);
app.post(
  "/api/upload",
  photoMiddleware.array("photos", 100),
  upload.uploadFromDevice
);

// getting all listings and detail of listing
app.get("/api/listings", listing.getListings);
app.get("/api/listings/:id", listing.getListingDetail);

// Creating new booking and getting booking details
app.get("/api/booking", booking.getBooking);
app.post("/api/booking", booking.newBooking);
app.delete("/api/booking/:id", booking.deleteBooking);

// filter and searching
app.get("/api/filter/:category", search.filterByCategory);
app.get("/api/search", search.filterBySearch);

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
