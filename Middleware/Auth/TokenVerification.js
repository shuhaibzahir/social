const jwt = require("jsonwebtoken")
const validateToken=(req,res,next)=>{
    console.log(req.header)
    if (req.header.Authorization){
        let token = req.header.Authorization.replace("Bearer ","")
        let verified = jwt.verify(token,process.env.JWTPRIVATE_KEY)
        console.log(verified)
        console.log(verified.userId)
        next()
    }else{
        res.status(401).json({apiEror:"Un Authorized"})
        return
    }
    
}
module.exports={validateToken}