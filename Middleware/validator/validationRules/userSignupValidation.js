const {body} = require("express-validator")

const signinValidation = ()=>{

    return [
        body("username").exists().withMessage("enter username"),
        body("password").exists().withMessage("Enter your password").custom((value,{req})=>{
          if(value !== req.body.confirmPassword){
            throw new Error('Password did not match')
          }else{
            return true
          }
        }),
        body('phone','Invalid phone number').exists().withMessage("please enter correct phone number").isLength({min:10}).isLength({max:10}),
        body('email').exists().withMessage("Please Enter Email Address").isEmail().withMessage("invalid Email"),
        
      ]
}

module.exports = signinValidation