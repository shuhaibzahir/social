 
const mongoose = require("mongoose")

module.exports={
    dbConnect:async(url)=>{
        try{
           await mongoose.connect(url).then(()=>{
               console.log("database connected successfully")
           })
        }catch(error){
            console.log(error)
        }
    }
}