 
const userHelper = require("../Models/helpers/user")
const jwt = require("jsonwebtoken")
 
 

// user signup ....................
const Signup=(req,res,next)=>{
     const data = req.body
     console.log(req.body)
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



const applyForConstructor = (req,res,next)=>{
    try{
  console.log(req.body)
    }catch(error){
        console.log(error.message)
    }
}
module.exports={Signup,SignIn,applyForConstructor}