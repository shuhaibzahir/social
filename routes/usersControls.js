
const { response } = require("express")
const userHelper = require("../Models/helpers/user")


// user signup 
const Signup=(req,res,next)=>{
     const data = req.body
     console.log(req.body)
    try{
        userHelper.userSignUp(data).then((userSignupData)=>{
             console.log(userSignupData)
            res.status(200).json({result:userSignupData})
        }).catch((er)=>{
            console.log(er)
            res.status(422).json({apiError:er})
        })
    }catch (error){
        console.log(error)
    }
}
const SignIN=(req,res,next)=>{
    const data = req.body
    console.log(req.body)
   try{
       userHelper.userSignUp(data).then((userSignupData)=>{
            console.log(userSignupData)
           res.status(200).json({result:userSignupData})
       }).catch((er)=>{
           console.log(er)
           res.status(401).json({apiError:er})
       })
   }catch (error){
       console.log(error)
   }
}

module.exports={Signup}