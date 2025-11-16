const express = require("express");
const router = express.Router();
const Place = require("../models/place.js");
const Booking = require("../models/booking.js");

// Search available rooms (places) by city + date range
router.post("/search", async (req, res) => {
  try {
    const { city, checkIn, checkOut } = req.body;

    if (!city || !checkIn || !checkOut) {
      return res.status(400).json({ error: "city, checkIn, checkOut needed" });
    }

    // get all places in that city
    const places = await Place.find({ city }).lean();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const availablePlaces = [];

    for (const place of places) {
      // check if place has any conflicting booking
      const conflict = await Booking.findOne({
        place: place._id,
        checkIn: { $lt: checkOutDate },
        checkOut: { $gt: checkInDate }
      });

      if (!conflict) availablePlaces.push(place);
    }

    res.json({ places: availablePlaces });
  } catch (error) {
    console.error("Error searching places:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
