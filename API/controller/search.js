const Place = require("../models/places");
const Booking = require("../models/booking");

function sanitizeInput(input) {
  return input.replace(/[^\w\s]/gi, "");
}

module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const searchResult = await Place.find({ category: category });
    res.json(searchResult);
  } catch (error) {
    console.log("Error in filtering", error);
  }
};

module.exports.filterBySearch = async (req, res) => {
  // Accepts either a free-text `searchTerm` or structured `city` plus optional
  // `checkIn` and `checkOut` (ISO date strings) to filter available places.
  const { searchTerm, city, checkIn, checkOut } = req.query;
  try {
    let places = [];

    if (city) {
      const cityRegex = new RegExp(sanitizeInput(city), "i");
      places = await Place.find({ city: { $regex: cityRegex } });
    } else if (searchTerm) {
      const searchQuery = sanitizeInput(searchTerm);
      const mainSearch = new RegExp(searchQuery, "i");
      places = await Place.find({
        $or: [
          { title: { $regex: mainSearch } },
          { address: { $regex: mainSearch } },
          { description: { $regex: mainSearch } },
          { extraInfo: { $regex: mainSearch } },
          { perks: { $regex: mainSearch } },
        ],
      });
    } else {
      // No filter provided: return all places
      places = await Place.find({});
    }

    // If no date filtering requested, return the matches now
    if (!checkIn || !checkOut) {
      return res.json(places);
    }

    // Parse dates
    const reqCheckIn = new Date(checkIn);
    const reqCheckOut = new Date(checkOut);
    if (isNaN(reqCheckIn) || isNaN(reqCheckOut) || reqCheckIn >= reqCheckOut) {
      return res.status(400).json({ error: "Invalid checkIn/checkOut dates" });
    }

    // If there are no places matching the location/search, return empty
    if (!places.length) return res.json([]);

    // Find bookings that overlap with requested dates
    // Overlap rule: booking.checkIn < reqCheckOut && booking.checkOut > reqCheckIn
    const placeIds = places.map((p) => p._id);
    const overlappingBookings = await Booking.find({
      place: { $in: placeIds },
      checkIn: { $lt: reqCheckOut },
      checkOut: { $gt: reqCheckIn },
    }).select("place");

    const occupiedPlaceIds = new Set(overlappingBookings.map((b) => b.place.toString()));

    // Filter out occupied places
    const availablePlaces = places.filter((p) => !occupiedPlaceIds.has(p._id.toString()));

    return res.json(availablePlaces);
  } catch (error) {
    console.log("Error in searching", error);
    return res.status(500).json({ error: "Server error while searching" });
  }
};
