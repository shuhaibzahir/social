const messageHelper = require("../Models/helpers/messageHelper")

const postMessage = (req,res)=>{

     const message = req.body
    
     messageHelper.addMessage(message).then((result)=>{
         res.status(200).json(result)
     }).catch((err)=>{
         res.status(400).json({apiError:err})
     })
}


const getMessages = (req,res)=>{
    let coversationId = req.params.conversationId

    messageHelper.getAllMessages(coversationId).then((result)=>{
        console.log(result)
        res.status(200).json({result})
    }).catch((err)=>{
        res.status(500).json({apiError:err})
    })

}

module.exports={postMessage,getMessages}