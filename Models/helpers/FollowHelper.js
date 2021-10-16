const mongoose  = require("mongoose")
const followSchema = require("../Schemas/FollowSchema")
const Follow = mongoose.model("follow",followSchema)
const ObjectId = mongoose.Types.ObjectId
module.exports={
    // follow a user
    following:(user,targetUser)=>{
        return new Promise(async(resolve,reject)=>{
            let currentUser = ObjectId(user)
            let followUser = ObjectId(targetUser)
           await Follow.updateOne({user:followUser},{$push:{followers:currentUser}},{upsert:true}).then((result)=>{
       
               
            }).catch((err)=>{
                console.log(err)
               
            })

            await Follow.updateOne({user:currentUser},{$push:{following:followUser}},{upsert:true}).then((result)=>{
                 
            }).catch((err)=>{
                console.log("this is err following statement ", err)
            })
            resolve(true)
        })
     },
     unFollow:(user,targetUser)=>{
        return new Promise(async(resolve,reject)=>{
            let currentUser = ObjectId(user)
            let followUser = ObjectId(targetUser)
           await Follow.updateOne({user:followUser},{$pull:{followers:currentUser}}).then((result)=>{
               
               
            }).catch((err)=>{
                console.log(err)
               
            })

            await Follow.updateOne({user:currentUser},{$pull:{following:followUser}}).then((result)=>{
              
            }).catch((err)=>{
               console.log(err)
            })
            resolve(true)
        })
     },

    //  get All followers form user
    getAllFollowers:(userid)=>{
     return new Promise(async(resolve,reject)=>{
        console.log("-------------------------------------------")
      

    //  test the agggregation

      await Follow.aggregate([
        {$match:{user:ObjectId(userid)}},
        {$lookup:{
            from:"users",
            foreignField:"_id",
            localField:"followers",
            as:"followersData"
        }},
        {$lookup:{
            from:"users",
            foreignField:"_id",
            localField:"following",
            as:"FollowingUsersData"
        }}
    ]).then((result)=>{
       resolve(result)
    }).catch(err=>{
        reject(err)
    })

 
     })
    }
}