 
const userHelper = require("../Models/helpers/userdb")
const {deleteFromS3} = require("../Middleware/Multer/s3bucket")
const postHelper = require("../Models/helpers/postHelper")
 
// post uploading 

const postUploading =(req,res)=>{
 
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
  try{
    let postId = req.params.postId
    let onePost = await postHelper.getOnePost(postId)
     onePost.mediaKey&&await deleteFromS3(onePost.mediaKey) 
      postHelper.deleteOnePost(postId).then((result)=>{
        res.status(200).json({result})
    }).catch(er=>{
        res.status(401).json({apiError:er})
    })
  }catch(err){
      console.log(err)
  }
}


const editPost = (req,res)=>{
    let data = req.body
    
    let postId = req.params.postId
    postHelper.editPOst(data,postId).then((result)=>{
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

// like post

const likePost =(req,res)=>{
    const user = req.session.userId
    let postId = req.params.postId
   
    req.session.destroy();
    postHelper.likeAPost(user,postId).then((result)=>{
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

// dislike post 

const disLikePost=(req,res)=>{
    const user = req.session.userId
    let postId = req.params.postId
     req.session.destroy();
    postHelper.disLikePost(user,postId).then((resutl)=>{
        res.status(200).json({resutl})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

// add comment 
const addComment =(req,res)=>{
    const postId = req.params.postId
    const userId = req.session.userId
    const comment = req.body.comment
    req.session.destroy()

    postHelper.addCommentPost(userId,postId,comment).then((result)=>{
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(403).json({apiError:err})
    })
}

// delete Comment

const deleteComment=(req,res)=>{
    const postId = req.params.postId
    const commnetId = req.params.commentId
    req.session.destroy()
    postHelper.deleteCommetFromPost(postId,commnetId).then((result)=>{
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}


module.exports={postUploading ,getAllPost,getOwnerPosts,deletPost,editPost,likePost,disLikePost,addComment,deleteComment}