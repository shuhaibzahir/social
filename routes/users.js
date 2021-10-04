var express = require("express");
var router = express.Router();


const { upload, deleteFromS3 } = require("../Middleware/Multer/s3bucket");

// main control funtions
const {
 
  applyForConstructor,
  fileUpload,
  fileDelte,getUserDetails
} = require("./usersControls");



router.get("/user/info",getUserDetails)
router.put("/constructor/apply/", applyForConstructor);
router.put("/profile-pic/upload", upload.array("file"), fileUpload);
router.get("/profile-pic/delete", deleteFromS3, fileDelte);
module.exports = router;
