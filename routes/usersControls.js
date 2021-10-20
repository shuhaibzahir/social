 
const userHelper = require("../Models/helpers/userdb")
const {deleteFromS3} = require("../Middleware/Multer/s3bucket")

const storyHelper = require("../Models/helpers/StoryHelper")
// get one user info 
const getUserDetails =(req,res)=>{
    let userId = req.session.userId
    userHelper.getOneUser(userId).then((result)=>{
        console.log(result)
        res.status(200).json({user:result})
    }).catch((er)=>{
        res.status(401).json({apiError:er})
    })
}

const getNormalUserProfile =(req,res)=>{
    let userId = req.params.userId
    userHelper.getOneUser(userId).then((result)=>{
        console.log(result)
        res.status(200).json({user:result})
    }).catch((er)=>{
        res.status(401).json({apiError:er})
    })
}

const applyForConstructor = (req,res,next)=>{
    try{
    const userID =   req.session.userId
     const data = req.body
     userHelper.applyForConstructor(userID,data).then((result)=>{
         console.log(result)
         res.status(200).json({user:result})
     }).catch((err)=>{
         console.log(err,"from applay form")
         res.status(402).
         res.status(422).json({apiError:err})
     })
    }catch(error){
        
        console.log(error.message)
    }
}

// uploading file
const fileUpload = async(req,res)=>{
   try{
    let response = req.files[0]
    let key = response.key
    let link = response.location
    let fileType = response.mimetype.split("/")[0]
    let user =  req.session.userId
 
    if(!fileType=="image"){
        res.status(401).json({apiError:"not an image"})
        return 
    }
    let getUserDetails = await userHelper.getOneUser(user)
    if(getUserDetails.profilePhotoKey){
        
     await deleteFromS3(getUserDetails.profilePhotoKey)
     console.log("deleted")
    }
   
    
    userHelper.uploadProfilePicture(user,key,link).then((result)=>{
         res.status(200).json({user:result})
    }).catch(err=>{
        res.status(401).json({apiError:err})
    })
   }catch(error){
       console.log(error)
   }    
    // "mimetype": "image/jpeg",
    // "mimetype": "video/mp4",
   
}

 

// suggestedUser 

const suggestedUser=(req,res)=>{
    let userId = req.session.userId
 
    req.session.destroy()
    userHelper.getAllRecommendedUsers(userId).then((result)=>{
        console.log(result)
        res.status(200).json({users:result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

// delete file
const fileDelte =(req,res)=>{
    res.status(200).json(req.files)
}


// get a user profile

const getaProfile=(req,res)=>{
    let userId = req.params.userId
    console.log(userId)
    req.session.destroy()
    userHelper.getAProfile(userId).then((result)=>{
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

// get user followers
const getGuestUserDatas =(req,res)=>{
    let userid = req.params.userId
    req.session.destroy()
    userHelper.getAUserProfileData(userid).then((result)=>{
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}


// story section


const createAStory = async(req,res)=>{
try {
 
    let userId = req.session.userId
    req.session.destroy()
    let response = req.files[0]
    console.log(response)
    let key = response.key
    let link = response.location
  
    // sending data to the database
    
    storyHelper.addStory(userId,link,key).then((result)=>{
        res.status(200).json({story:result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
} catch (error) {
        console.log(error)
}

 
}


// get All users story 

const getAllStory =async(req,res)=>{
    try{
        let userId = req.session.userId
    req.session.destroy()
    let userStory = await  storyHelper.getUserStory(userId)
    let userFollowingStory = await storyHelper.getAllUserStory(userId)
    console.log(userStory, userFollowingStory)
    res.status(200).json({userStory, userFollowingStory})
    }catch(err){
        console.log(err,"this is form the getAllStory router function")
        res.status(401).json({apiError:err})
    }
    
}

// delete Story 

const deleteStory =async(req,res)=>{
   try {
    let userId = req.session.userId
    req.session.destroy()
    console.log('this is working delete')
    let storyInformation = await storyHelper.getUserStory(userId)
    await deleteFromS3(storyInformation.imageKey)
    await  storyHelper.deleteStoy(userId)
    res.status(200).json({resutl:true})
   } catch (error) {
       console.log(error)
    res.status(401).json({apiError:error})
   }


    
}

const getSearchResult=(req,res)=>{
    req.session.destroy()
    let keyword = req.query.key
    
    userHelper.getUsersDetails(keyword).then((result)=>{
        res.status(200).json({result:result})
    }).catch(er=>{
        res.status(401).json({apiError:er})
    })
}

module.exports={applyForConstructor,fileUpload, fileDelte,getUserDetails,suggestedUser,getaProfile,getGuestUserDatas,createAStory,getAllStory,deleteStory,getSearchResult,getNormalUserProfile}