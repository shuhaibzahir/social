var express = require("express");
var router = express.Router();


const { upload, deleteFromS3 } = require("../Middleware/Multer/s3bucket");

// main control funtions
const {
 
  applyForConstructor,
  fileUpload,
  fileDelte,getUserDetails
} = require("./usersControls");

 const {
  postUploading,
  getAllPost
 } = require("./postControl")


router.get("/user/info",getUserDetails)
router.put("/constructor/apply/", applyForConstructor);
router.put("/profile-pic/upload", upload.array("file"), fileUpload);
router.get("/profile-pic/delete", deleteFromS3, fileDelte);
router.post("/uploading",upload.array('media'),postUploading)
router.get("/logged/get/all/post",getAllPost)
module.exports = router;
