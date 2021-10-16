 
const mongoose = require("mongoose")

module.exports={
    dbConnect:async(url)=>{
        try{
           await mongoose.connect(url,{ useNewUrlParser: true }).then(()=>{
               console.log("database connected successfully")
           }).catch((err)=>{
               console.log(err)
           })
        }catch(error){
            console.log(error)
        }
    }
}