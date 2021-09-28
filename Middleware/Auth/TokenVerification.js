const jwt = require("jsonwebtoken")
const userHelper = require("../../Models/helpers/user")
const validateToken=(req,res,next)=>{
    
    if (req.headers.authorization){
        let token = req.headers.authorization.replace("Bearer ","")
        let verified = jwt.verify(token,process.env.JWTPRIVATE_KEY)
         if(verified.userId){
            userHelper.getOneUser(verified.userId).then((result)=>{
                req.body.userId = verified.userId
                next()
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