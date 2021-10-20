const userHelper = require("../Models/helpers/userdb")
const jwt = require("jsonwebtoken")


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


// signin with google



const signInWithGoogle =(req,res)=>{
  

    userHelper.googleLogin(req.body).then(result=>{
       
        let userToken = jwt.sign({userId:result._id },process.env.JWTPRIVATE_KEY );
        res.status(200).json({user:result,token:userToken})
   
    }).catch(err=>{
        res.status(401).json({apiError:err})
    })
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

module.exports={SignIn,Signup,signInWithGoogle}