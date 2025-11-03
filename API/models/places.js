const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {                       
        type: String,
        required: true,
    },
    photos: {
        type: Array,
    },
    description: {
        type: String,
    },
    category:{
        type: String,
    },
    perks: {
        type: Array,
    },
    extraInfo: {
        type: String,// used to define house rules
    },
    checkIn: {
        type: Number
    },
    checkOut: {
        type: Number
    },
    maxGuests: {
        type: Number
    },
    price: {
        type: Number
    }
    
})

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel