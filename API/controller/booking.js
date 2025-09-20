const Booking = require("../models/booking.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

module.exports.newBooking = async (req, res) => {
  let { place, checkIn, checkOut, mobile, numberOfGuests, name, price, token } =
    req.body;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.log("not getting user", err);
        return res.status(401).json({ error: "Unauthorized" });
      }
      const existingBooking = await Booking.findOne({
        place,
        $or: [
          {
            checkIn: { $lt: new Date(checkOut) }, // existing booking starts before new checkout
            checkOut: { $gt: new Date(checkIn) }  // existing booking ends after new checkin
          }
        ]
      });
      if (existingBooking) {
        return res
          .status(400)
          .json({ error: "This place is already booked for the selected dates." });
      }
      const bookingDoc = await Booking.create({
        place,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        mobile,
        numberOfGuests,
        name,
        price,
        user: userData.id,
      });

      res.json(bookingDoc);
    });
  } catch (error) {
    console.log("Error in post booking place", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getBooking = async (req, res) => {
  const {token} = req.query
  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) console.log("not getting user", err);
      res.json(await Booking.find({ user: userData.id }).populate("place"));
    });
  } catch (error) {
    console.log("Error in geting booking place", error);
  }
};


module.exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  const { token } = req.query;

  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });

      const booking = await Booking.findById(id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Only allow user to delete their own booking
      if (booking.user.toString() !== userData.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await Booking.findByIdAndDelete(id);
      res.json({ message: "Booking cancelled successfully" });
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



