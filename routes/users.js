var express = require("express");
var router = express.Router();
const { validateToken } = require("../Middleware/Auth/TokenVerification");
const { userSignup } = require("../Middleware/validator/Allrules");
const ValidateResult = require("../Middleware/validator/ValidationResult");
const { upload, deleteFromS3 } = require("../Middleware/Multer/s3bucket");


const {
  Signup,
  SignIn,
  applyForConstructor,
  fileUpload,
  fileDelte,
} = require("./usersControls");



router.post("/userSignup", userSignup(), ValidateResult, Signup);
router.post("/userSignin", SignIn);
router.put("/applay/constructor/", validateToken, applyForConstructor);
router.post("/api/profile-pic/upload", upload.array("image"), fileUpload);
router.get("/api/profile-pic/delete", deleteFromS3, fileDelte);
module.exports = router;
