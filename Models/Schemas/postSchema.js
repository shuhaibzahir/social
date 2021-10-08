const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const PostSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        
    },
    title:{
        type:String,
         
    },
    date:{
        type:Date,
        default: Date.now
    },
    content:{
        type:String
    },
    privacy:{
        type:String,
        
   },
   like:{
       type:Array
   },
   comments:{
       type:String
   },
   reported:{
       type:Boolean
   },
   videoType:{
       type:Boolean
   },
   imageType:{
       type:Boolean
   },
   mediaLink:{
       type:String
   },
   mediaKey :{
       type:String
   },
   tags:{
       type:Array
   }



})

module.exports = PostSchema