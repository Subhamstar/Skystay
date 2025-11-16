if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.port || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// controllers
const auth = require("./controller/auth.js");
const profile = require("./controller/profile.js");
const upload = require("./controller/upload.js");
const listing = require("./controller/listing.js");
const booking = require("./controller/booking.js");
const search = require("./controller/search.js");
const hostVerification = require("./controller/hostVerification.js");

// ✅ allowed origins
const allowedOrigins = [
  "https://roombooking-frontend-z9s9.onrender.com", // production frontend
  "http://localhost:5173",                          // local dev
];



const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // ✅ instead of callback(null, origin)
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};

// ✅ apply CORS + handle preflight
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then((conn) => {
    console.log(`Mongodb connected at: ${conn.connection.host}`);
    app.listen(port, () => {
      console.log(`Server is running on Port: ${port}`);
    });
  })
  .catch((e) => {
    console.log("❌ Connection Error:", e.message);
  });


// middlewares
app.use(express.json());
app.use("/uploadS", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const photoMiddleware = multer({ dest: "uploads" });

// routes
app.get("/test", (req, res) => {
  res.send("hello");
});

// auth
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.post("/api/logout", auth.logout);

// host verification
app.post("/api/host/verify", hostVerification.sendVerificationOTP);
app.post("/api/host/verify-otp", hostVerification.verifyOTP);

// profile
app.get("/api/profile", profile.getProfile);
app.get("/api/places", profile.myListedPlaces);
app.post("/api/places", profile.uploadNewPlace);
app.put("/api/places", profile.editPlaceDetails);
app.get("/api/places/:id", profile.placeInDetail);

// upload
app.post("/api/upload-by-link", upload.uploadByLink);
app.post(
  "/api/upload",
  photoMiddleware.array("photos", 100),
  upload.uploadFromDevice
);

// listings
app.get("/api/listings", listing.getListings);
app.get("/api/listings/:id", listing.getListingDetail);

// booking
app.get("/api/booking", booking.getBooking);
app.post("/api/booking", booking.newBooking);
app.delete("/api/booking/:id", booking.deleteBooking);

// search
app.get("/api/filter/:category", search.filterByCategory);
app.get("/api/search", search.filterBySearch);

// start server
