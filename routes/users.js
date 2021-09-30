var express = require('express');
var router = express.Router();
const {validateToken} = require("../Middleware/Auth/TokenVerification")
const {userSignup} = require("../Middleware/validator/Allrules")
const ValidateResult = require("../Middleware/validator/ValidationResult")
const {Signup,SignIn,applyForConstructor,fileUpload} = require("./usersControls")
const {imageUpload} = require("../Middleware/Multer/Multer")
router.post("/userSignup",userSignup(),ValidateResult,Signup)
router.post("/userSignin",SignIn)
router.put("/applay/constructor/",validateToken,applyForConstructor)
router.post("/upload",imageUpload.single('myFile'),fileUpload)
module.exports = router;
