 
const userHelper = require("../Models/helpers/userdb")
const {deleteFromS3} = require("../Middleware/Multer/s3bucket")
const postHelper = require("../Models/helpers/postHelper")
 
// post uploading 

const postUploading =(req,res)=>{
    console.log("here reached")
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
    const userData = userHelper.getOneUser(user)
    postHelper.getAllRelatedPost(userData).then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
}



module.exports={postUploading ,getAllPost}