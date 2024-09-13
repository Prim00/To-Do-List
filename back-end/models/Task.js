
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    time :{
        type : Date,
        required : true
    },
    userEmail:{
        type : mongoose.Schema.Types.String,
        ref :"User",
        required :true
    }



});

const Task  = mongoose.model("The Tasks",taskSchema);

module.exports = Task;