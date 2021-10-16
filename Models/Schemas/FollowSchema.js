const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Follow = new mongoose.Schema({
    user:{
        type:ObjectId
    },
    following:{
        type:Array
    },
    followers:{
        type:Array
    }

})

module.exports = Follow