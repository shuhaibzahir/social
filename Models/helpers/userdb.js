 
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
 const SALTROUND= 10
 
const UserSchema = require("../Schemas/userSchema")
// create collection for user  
const User = mongoose.model('User',UserSchema )
const PostSchema = require("../Schemas/postSchema");
const Post = mongoose.model("Post", PostSchema);

const FollowSchema = require("../Schemas/FollowSchema")
const Follow = mongoose.model('follow',FollowSchema)
const ObjectId = mongoose.Types.ObjectId
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
    // google signin
    googleLogin:(data)=>{
        return new Promise((resolve,reject)=>{
            let userData =   new User({
                username:data.name,
                phone:data.phone,
                photo:data.imageUrl,
                email:data.email,
                preferredLocation:["india,united states"],
                constructorPower:false,
                OAuth:true
        })

        User.findOne({email:data.email}).then((result)=>{
            if(result){
                resolve(result)
            }else{
                userData.save((err,savedData)=>{
                    if(err){
                        console.log(err)
                    }else{
                        resolve(savedData)
                    }
                })
            }
        })
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
    applyForConstructor:(userID,data)=>{
        return new Promise(async(resolve,reject)=>{
            const userid = userID

            const userExist = await User.findOne({constructorId:data.constructorId})
            if(userExist) reject("Construcot Id Already Registerd")
            
            User.findOneAndUpdate({_id:userid},{$set:{
                constructorId:data.constructorId,
                companyName:data.companyName,
                services:data.services,
                address:data.address,
                applied:"pending",
                rejected:false
            }}).then(async(result)=>{
                let newDetails = await User.findOne({_id:userid})
                resolve(newDetails)
             }).catch((err)=>{
                console.log(err)
            })
        })
    },
    uploadProfilePicture:(user,key,link)=>{
        return new Promise((resolve,reject)=>{
            User.updateOne({_id:user},{$set:{photo:link,profilePhotoKey:key}}).then(()=>{
                let latestUserDetails= User.findOne({_id:user})
                resolve(latestUserDetails)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    // this is for getting the sudggested users

    getAllRecommendedUsers:(userid)=>{
        return new Promise(async(resolve,reject)=>{
             let userLocation =await User.findOne({_id:userid})
            let followingList = await Follow.findOne({user:userid})
            let followingPoeple = followingList?followingList.following:[]

            User.find({$and:[{_id:{$nin:followingPoeple}},{_id:{$ne:userid}},{preferredLocation:{$in:userLocation.preferredLocation}},{constructorPower:true}]}).then((result)=>{
                  resolve(result)
            }).catch((err)=>{
                 
                reject(err)
            })
        })
    },
    getAProfile:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            try{
            let user = await User.findOne({_id:userId})
            let posts = await   Post.find({$and:[{user:userId},{privacy:'public'}]}).sort({_id:-1}) 
            let useNetworkData = await Follow.findOne({user:ObjectId(userId)})
            resolve({user,posts,useNetworkData})
            }catch(err){
                console.log(err)
            }
            
        })
    },
    // get useDetails follow and followers
    getAUserProfileData:(userid)=>{
        return new Promise((resolve,reject)=>{
            Follow.findOne({user:userid}).then((result)=>{
                console.log(result)
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    // finding the user 

    getUsersDetails:(keyword)=>{
        return new Promise((resolve, reject)=>{
            User.find({$and:[{username:{ $regex: keyword,  $options: "si" }},{constructorPower:true}]}).then((result)=>{
               
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
     
  
}