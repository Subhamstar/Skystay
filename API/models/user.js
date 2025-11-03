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
        enum:['user','admin']
    }
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel