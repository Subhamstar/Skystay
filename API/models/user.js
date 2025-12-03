const mongoose = require("mongoose")
const validator=require("validator")
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        validate:{
            validator:validator.isEmail,
            message:"Enter a valid Email Address !! "
        }
    },
    password :{
        type: String,
        validate:{
            validator:validator.isStrongPassword,
            message:"Please enter a strong Password !!"
        }
    },
    role:{
        type:String,
        enum:['user','admin','host'],
        default:'user'
    },
    mobileNumber: {
        type: String,
        default: null
    },
    aadharNumber: {
        type: String,
        default: null
    },
    hostVerified: {
        type: Boolean,
        default: false
    },
    verificationOTP: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    }
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel