const Place = require("../models/places")

module.exports.getListings = async (req, res) => {
    const data = await Place.find({});
    res.json(data);
  }

  module.exports.getListingDetail = async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
  }