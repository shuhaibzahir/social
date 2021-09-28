var express = require('express');
var router = express.Router();
const {validateToken} = require("../Middleware/Auth/TokenVerification")
const {userSignup} = require("../Middleware/validator/Allrules")
const ValidateResult = require("../Middleware/validator/ValidationResult")
const {Signup,SignIn,applyForConstructor} = require("./usersControls")

router.post("/userSignup",userSignup(),ValidateResult,Signup)
router.post("/userSignin",SignIn)
router.put("/applay/constructor/",validateToken,applyForConstructor)
module.exports = router;
