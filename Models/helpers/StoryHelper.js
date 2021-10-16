const mongoose = require("mongoose")
const StorySchema = require("../Schemas/StorySchema")
const Story = mongoose.model("story",StorySchema)
 
const FollowSchema = require("../Schemas/FollowSchema")
const Follow = mongoose.model('follow',FollowSchema)
const ObjectId = mongoose.Types.ObjectId
module.exports={
    // add a story to the database
    addStory:(userId,imageLink,imageKey)=>{
        return new Promise((resolve,reject)=>{

           
            const newStory = new Story({
                user: userId,
                imageLink:imageLink,
                imageKey:imageKey
            })
         
            newStory.save((err,data)=>{
                if(err){
                
                    reject(err)
                }else{
                    console.log(data,"this is data")
                    resolve(data)
                }
            })
        })
    },
    getUserStory:(userId)=>{
        return new Promise((resolve,reject)=>{
            Story.findOne({user:ObjectId(userId)}).then(data=>{
                console.log(data,"this is user Story")
                resolve(data)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    deleteStoy:(userId)=>{
        return new Promise((resolve,reject)=>{
            Story.deleteOne({user:ObjectId(userId)}).then((d)=>{
                resolve(d)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    getAllUserStory:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let getAllFollowing = await Follow.findOne({user:userId}) 
            let follwingArray = getAllFollowing?.following
            let getAllStory = await Story.find({user:{$in:follwingArray}})
            resolve(getAllStory)
        })
    }
}