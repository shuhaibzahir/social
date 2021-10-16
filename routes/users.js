var express = require("express");
var router = express.Router();


const { upload, deleteFromS3 } = require("../Middleware/Multer/s3bucket");

// main control funtions
const {
 
  applyForConstructor,
  fileUpload,
  fileDelte,getUserDetails,
  suggestedUser,
  getaProfile,
  getGuestUserDatas,
  createAStory,
  getAllStory,
  deleteStory,
  getSearchResult
} = require("./usersControls");

 const {
  postUploading,
  getAllPost,
  getOwnerPosts,
  deletPost,
  editPost,
  likePost,
  disLikePost,
  addComment,
  deleteComment
 } = require("./postControl")

const {
 followAUser,
 unFollowAUser,
 getFollowers
} = require("./followersControl")


router.get("/user/info",getUserDetails)
router.put("/constructor/apply/", applyForConstructor);
router.put("/profile-pic/upload", upload.array("file"), fileUpload);
router.get("/profile-pic/delete", deleteFromS3, fileDelte);
router.post("/uploading",upload.array('media'),postUploading)
router.get("/logged/get/all/post",getAllPost)
router.get("/user/own/post",getOwnerPosts)
router.delete("/post/delete/:postId",deletPost)
router.put("/post/edit/:postId",editPost)
router.put('/post/like/:postId',likePost)
router.put('/post/dislike/:postId',disLikePost)
router.put("/post/add/comment/:postId",addComment)
router.put("/delete/comment/:postId/:commentId",deleteComment)
router.put("/follow/user/:target/",followAUser)
router.put("/unfollow/user/:target/",unFollowAUser)
router.get("/suggested/user",suggestedUser)
router.get("/user/profile/:userId",getaProfile)
router.get("/user/network/data",getFollowers)
router.get("/user/network/data/:userId",getGuestUserDatas)

// story section

router.post("/user/story/update",upload.array("file"),createAStory)
router.get("/user/get/all/stories",getAllStory)
router.delete("/user/delete/story",deleteStory)

 
// search key word

router.get("/search/result",getSearchResult)

 
module.exports = router;
