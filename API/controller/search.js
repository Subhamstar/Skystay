const Place = require("../models/places");

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
  const { searchTerm } = req.query;
  try {
    const searchQuery = sanitizeInput(searchTerm);
    const mainSearch = new RegExp(searchQuery, "i");
    const response = await Place.find({
      $or: [
        { title: { $regex: mainSearch } },
        { address: { $regex: mainSearch } },
        { description: { $regex: mainSearch } },
        { extraInfo: { $regex: mainSearch } },
        { perks: { $regex: mainSearch } },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log("Error in searching", error);
  }
};
