const mongoose = require("mongoose");
const PostSchema = require("../Schemas/postSchema");
const UserSchema = require("../Schemas/userSchema");
const Post = mongoose.model("Post", PostSchema);
const User = mongoose.model('User',UserSchema )

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
  getAllRelatedPost:(loggedInUser)=>{
    return new Promise(async(resolve,reject)=>{
       let userLocation = loggedInUser.preferredLocation
        
      let PostUsers= await User.find({preferredLocation:{$in:userLocation}},{_id:1})
      let usersID = PostUsers.map((i)=>i._id)
       Post.find({user:{$in:usersID}}).sort({_id:-1}).then((datafromPost)=>{
         
         resolve(datafromPost)
       }).catch((error)=>{
         reject(error)
       })

      //  then take the users which included these same location and take their user name
      //  after that need to check the user name in post collecion then take posts and print if it is not then take the users which included the same locationn and theri following list after that theri
      //  posts limit 100
    })
  },

// getting the user's posts only

getUserPosts:(userid)=>{
  return new Promise((resolve,reject)=>{
   Post.find({user:userid}).sort({_id:-1}).then((result)=>{
      resolve(result)
    }).catch((err)=>{
      reject(err)
    })



  })
},

// get one post details

getOnePost:(postId)=>{
  return  new Promise((resolve,reject)=>{
    Post.findOne({_id:postId}).then((result)=>{
      resolve(result)
    }).catch((err)=>{
      reject(err)
    })
  })
},

// delete One post
deleteOnePost:(postId)=>{
  return new Promise((resolve,reject)=>{
    Post.deleteOne({_id:postId}).then((result)=>{
      resolve(result)
    }).catch((err)=>{
      reject(err)
    })
  })
}

};
