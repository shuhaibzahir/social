 
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
                 preferredLocation:data.preferredLocation,
                 constructorPower:false
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
    },
    userSignIn:(data)=>{
        return new Promise ((resolve, reject)=>{
            try{
                User.findOne({email:data.email}).then(async(result)=>{
                    
                    if(!result){
                        reject("Invalid Credential")

                    }else{
                    
                        if(result.status){
                            console.log("evide ethi")
                            let successPass = await bcrypt.compare(data.password,result.password)
                           successPass?resolve(result):reject("Invalid Credential")
                        }else{
                            reject("User Blocked By Admin ")
                        }
                    }
                })
            }catch (error){
                console.log(error)
            }
        })
    },
    getOneUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            try{
                User.findOne({_id:userId},(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        if(result){
                           resolve(result)
                            
                        }else{
                            reject("not found")
                        }
                    }
                })
            }catch(error){
                console.log(error)
            }
        })
    },
    applyForConstructor:(data)=>{
        return new Promise(async(resolve,reject)=>{
            const userid = data.userId

            const userExist = await User.findOne({constructorId:data.constructorId})
            if(userExist) reject("Construcot Id Already Registerd")


            User.findOneAndUpdate({_id:userid},{$set:{
                constructorId:data.constructorId,
                companyName:data.companyName,
                services:data.services,
                address:data.address,
                applied:"pending"
            }}).then(async(result)=>{
                let newDetails = await User.findOne({_id:data.userId})
                resolve(newDetails)
             }).catch((err)=>{
                console.log(err)
            })
        })
    }
}