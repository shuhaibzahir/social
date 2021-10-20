 
const Conversation = require("../Schemas/Conversation")

module.exports={
    //   new Conversation
    createConversation:(sender,receiver)=>{
        return new Promise((resolve,reject)=>{
            let members = [ sender,receiver]
            const newconver = new Conversation({
                members:members
            })
            

            Conversation.findOne({members:{$all:members}}).then(result=>{
                 if(!result){
                    newconver.save((err,data)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(data)
                        }
                    })
                 }else{
                     console.log("already conversation built")
                     resolve(true)
                 }
            })

         

        })
    },

    // get conversation
    getAllConversation:(userId)=>{
        return new Promise((resolve,reject)=>{
            Conversation.find({members:{$in:[userId]}}).then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}