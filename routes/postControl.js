 
const userHelper = require("../Models/helpers/userdb")
const {deleteFromS3} = require("../Middleware/Multer/s3bucket")
const postHelper = require("../Models/helpers/postHelper")
 
// post uploading 

const postUploading =(req,res)=>{
 console.log(req.files[0])
const {title,content,tags,privacy} = req.body
const {location, mimetype, key }= req.files[0] || {}
const user = req.session.userId
 const data = {title,content,tags,privacy,location, mimetype, key,user}

postHelper.uploadingPost(data).then((result)=>{
    req.session.destroy();
    res.status(200).json({post:result})
}).catch((er)=>{
    res.status(401).json({apiError:er})
})
 }

//  get all post 

const getAllPost= async(req,res)=>{
    const user = req.session.userId
    req.session.destroy();
    const userData = await userHelper.getOneUser(user)
    console.log(userData)
    postHelper.getAllRelatedPost(userData).then((result)=>{
       res.status(200).json({data:result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

const getOwnerPosts =(req,res)=>{
    let userId = req.session.userId
  
    req.session.destroy();
    postHelper.getUserPosts(userId).then((result)=>{
        res.status(200).json({posts:result})
     }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

// delet posters 

const deletPost= async(req,res)=>{
    let postId = req.params.postId
    let onePost = await postHelper.getOnePost(postId)
 
     let deletedData = await deleteFromS3(onePost.mediaKey)
     console.log(deletedData)
    postHelper.deleteOnePost(postId).then((result)=>{
        res.status(200).json({result})
    }).catch(er=>{
        res.status(401).json({apiError:er})
    })
}


module.exports={postUploading ,getAllPost,getOwnerPosts,deletPost}