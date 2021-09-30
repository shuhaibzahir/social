 
const userHelper = require("../Models/helpers/user")
const jwt = require("jsonwebtoken")
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.SECRET_KEY_AWS
})
// user signup ....................
const Signup=(req,res,next)=>{
     const data = req.body
      
    try{
        userHelper.userSignUp(data).then(async(userSignupData)=>{
            let userToken = jwt.sign({userId:userSignupData._id },process.env.JWTPRIVATE_KEY );
            res.status(200).json({user:userSignupData,token:userToken})
        }).catch((er)=>{
            console.log(er)
            res.status(422).json({apiError:er})
        })
    }catch (error){
        console.log(error)
    }
}
// user Login ...................
const SignIn=(req,res,next)=>{
    const data = req.body
    
   try{
    userHelper.userSignIn(data).then((success)=>{
      let userToken = jwt.sign({userId:success._id },process.env.JWTPRIVATE_KEY );
          res.status(200).json({user:success,token:userToken})
    }).catch(err=>{
        console.log(err)
        res.status(401).json({apiError:err})
    })
   }catch (error){ 
       console.log(error)
   }
}
// userinfo

const fileUpload=(req,res,next)=>{
     console.log(req.file.originalname)
}


const applyForConstructor = (req,res,next)=>{
    try{
     const data = req.body
     userHelper.applyForConstructor(data).then((result)=>{
         res.status(200).json({user:result})
     }).catch((err)=>{
         res.status(402).
         res.status(422).json({apiError:err})
     })
    }catch(error){
        console.log(error.message)
    }
}
module.exports={Signup,SignIn,applyForConstructor,fileUpload}