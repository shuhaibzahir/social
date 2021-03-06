const mongoose = require("mongoose")


// module.exports = new mongoose.Schema({
//     username:String,
//     email:String,
//     phone:Number,
//     password:String,
//     preferredLocation:Array,
//     constructor:Boolean,
//     constructorId:String,
//     companyServices:Array,
//     address:Object,
//     photo:String,
//     coverPhoto:String

//  })

module.exports = new mongoose.Schema({
    username:{
        type: String,
         
    },
    email:{
        type: String,
        
    },
    password:{
        type: String,
      
    },
    phone:{
        type:Number,
        
    },
    preferredLocation:{
        type:Array,
         
    },
    companyName:{
        type:String,
    },
    applied:{
        type:String,
        default:"not"
    },
    status:{
        type:Boolean,
        default:true
    },
    constructorPower:{
        type:Boolean,
        default:false
    },
    constructorId:{
        type:String
    },
    services:{
        type:Array
    },
    photo:{
        type:String
    },
    rejected:{
        type:Boolean,
        default:false
    },
    coverPhotoKey:{
        type:String
    },
    coverPhoto:{
        type:String
    },
    profilePhotoKey:{
        type:String
    },
    address:{
        type: Object
    },
    OAuth:{
        type:Boolean,
        default:false
    }

})

 