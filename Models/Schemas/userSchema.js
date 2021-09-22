const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username is required*']
    },
    email:{
        type: String,
        required: [true, 'username is required*']
    },
    password:{
        type: String,
       required: [true, 'password is required*']
    },
    phone:{
        type:Number,
        required:[true, "Enter Phone Number*"]
    },
    preferredLocation:{
        type:Array,
        required:[true, "Enter preferred location*"]
    },
    constructor:{
        type:Boolean
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
    coverPhoto:{
        type:String
    },
    address:{
        type:Object
    }

})

module.exports=UserSchema