const jwt = require("jsonwebtoken")
const userHelper = require("../../Models/helpers/userdb")
const validateToken=(req,res,next)=>{
   
    if (req.headers.authorization){
        let token = req.headers.authorization.replace("Bearer ","")
        let verified = jwt.verify(token,process.env.JWTPRIVATE_KEY)
         if(verified.userId){
            userHelper.getOneUser(verified.userId).then((result)=>{
               if(result.status){
                req.session.userId = verified.userId
                next()
               }else{
                   res.status(401).json({apiError:"User  Blocked"})
                   return
               }
            }).catch((err)=>{
                res.status(401).json({apiError:"Un Authorized"})
                return
            })
         }  
       
    }else{
        res.status(401).json({apiError:"Un Authorized"})
        return
    }
    
}
module.exports={validateToken}