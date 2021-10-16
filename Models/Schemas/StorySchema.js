const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
module.exports = new mongoose.Schema({
    imageLink:{
        type:String
    },
    imageKey:{
        type:String
    },
    user:{ 
         
        type:ObjectId
    }

})