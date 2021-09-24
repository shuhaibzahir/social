 
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
 const SALTROUND= 10
 
const UserSchema = require("../Schemas/userSchema")
// create collection for user

 
const User = mongoose.model('User',UserSchema )

module.exports={
    userSignUp:(data)=>{
         
         return new Promise(async(resolve, reject)=>{
        
            // find a user with the same credential to know the details already exist or not
                
             let userEmailExist =   await User.findOne({email:data.email}) 

             let userPhoneExist =  await User.findOne({phone:data.phone}) 

                
              //create new user
        
            if(userEmailExist){
                reject("Email Already Exist")
            }else if(userPhoneExist){
                reject("Phone Number Already Exist")
            }else{
                let hash = await bcrypt.hash(data.password, SALTROUND)
                let userData =   new User({
                 username:data.username,
                 password:hash,
                 phone:data.phone,
                 email:data.email,
                 preferredLocation:data.preferredLocation
             })
             
               userData.save((err,userSavedData)=>{
                  if(err){
                      console.log(err)
                  }else{
                      resolve(userSavedData)
                  }
              })
              
            }
          
              
        })
    }
}