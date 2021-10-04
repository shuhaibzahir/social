 
const userHelper = require("../Models/helpers/userdb")
const {deleteFromS3} = require("../Middleware/Multer/s3bucket")



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

const applyForConstructor = (req,res,next)=>{
    try{
    const userID =   req.session.userId
     const data = req.body
     userHelper.applyForConstructor(userID,data).then((result)=>{
         res.status(200).json({user:result})
     }).catch((err)=>{
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
    console.log(user)
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
        console.log(result)

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


// delete file
const fileDelte =(req,res)=>{
    res.status(200).json(req.files)
}


module.exports={applyForConstructor,fileUpload, fileDelte,getUserDetails}