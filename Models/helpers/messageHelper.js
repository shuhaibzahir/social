const Message = require("../Schemas/Message")

module.exports={
    addMessage:(data)=>{
        return new Promise((resolve,reject)=>{
            const message = new Message(data)
            message.save((err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    },
    getAllMessages:(cId)=>{
        return new Promise((resolve,reject)=>{
            Message.find({conversationId:cId}).then((result)=>{
             
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}