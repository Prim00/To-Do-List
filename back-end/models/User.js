const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
        firstname:String,
        lastname:String,
        phone:Number,
        email : {
                type:String,
                unique : true,
                required: true
                },
        password: {
                type : String,
                required : true
                },
        verifyToken : {
                type : String,
                required :false,
        }
})

const user = mongoose.model("User",userSchema)
module.exports = user;

