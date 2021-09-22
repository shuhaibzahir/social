const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const PostSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        require:[true ,"please login"]
    },
    title:{
        type:String,
        required:[true, "please add title"]
    },
    date:{
        type:Date,
        default: Date.now
    },
    description:{
        type:String
    },
    privacy:{
        type:String,
        enum:['public','private']
   },
   like:{
       type:Array
   },
   comments:{
       type:String
   },
   reported:{
       type:Boolean
   }



})