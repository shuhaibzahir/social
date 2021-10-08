const mongoose = require("mongoose");
const PostSchema = require("../Schemas/postSchema");
const Post = mongoose.model("Post", PostSchema);

module.exports = {
  // uploading a post
  uploadingPost: ({
    title,
    content,
    key,
    location,
    privacy,
    tags,
    user,
    mimetype,
  }) => {
    return new Promise((resolve, reject) => {
      let postType = {};
      // checking the key for any media uploaded to aws and if any media is the then it will be go to next function
      if (key) {
        let type = mimetype.split("/")[0];
        if (type == "image") {
          postType = {
            videoType: false,
            imageType: true,
            mediaLink: location,
            mediaKey: key,
          };
        } else {
          postType = {
            videoType: true,
            imageType: false,
            mediaLink: location,
            mediaKey: key,
          };
        }
      }
      // setting up the tags an array
      let tagArray = ["skyline"];
      if (tags) {
        let newTagArray = tags.split(",");
        tagArray = [...tagArray, ...newTagArray];
      }

      const newPost = new Post({
        user: user,
        title: title,
        content: content,
        privacy: privacy,
        ...postType,
        tags: tagArray,
      });
      newPost
        .save()
        .then((result) => {
          resolve(result);
        })
        .catch((er) => {
          reject(er);
        });
    });
  },
  getAllRelatedPost:(user)=>{
    return new Promise((resolve,reject)=>{
       let userLocation = user.location
      //  then take the users which included these same location and take their user name
      // after that need to check the user name in post collecion then take posts and print if it is not then take the users which included the same locationn and theri following list after that theri
      // posts limit 100
    })
  }
};
