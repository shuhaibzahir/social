
const conversationHelper = require("../Models/helpers/Conversationhelper")

const postConversation =(req,res)=>{

     let senderId = req.body.senderId
     let receiverId = req.body.receiverId
     conversationHelper.createConversation(senderId,receiverId).then((result)=>{
         res.status(200).json({result})
     }).catch((err)=>{
         res.status(400).json({apiError:err})
     })
 
}

const getConversation =(req,res)=>{
     let userid = req.session.userId
     req.session.destroy()
     conversationHelper.getAllConversation(userid).then((result)=>{
         res.status(200).json({result})
     }).catch((err)=>{
         res.status(400).json({apiError:err})
     })
}

module.exports={postConversation,getConversation}