var express = require('express');
var router = express.Router();
const {userSignup} = require("../Middleware/validator/Allrules")
const ValidateResult = require("../Middleware/validator/ValidationResult")
const {Signup} = require("./usersControls")

router.post("/userSignup",userSignup(),ValidateResult,Signup)
module.exports = router;
