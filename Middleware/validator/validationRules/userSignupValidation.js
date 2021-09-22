const {body} = require("express-validator")

const signinValidation = ()=>{
    return [
        body('username').notEmpty().withMessage("enter ussername"), 
        body('email').isEmail().withMessage("Entire email properly"),
        body('password').isLength({ min: 5 }).withMessage("pleaser enter at least 5 characters")
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
              throw new Error('Password confirmation is incorrect');
            }
          }),
        body('phone').toInt().isLength({max:10}).withMessage("enter your phone number properly"),
        body('preferredLocation').isLength({min:1}).withMessage("Please select atleast one perferd location")
      ]
}

module.exports = signinValidation