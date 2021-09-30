
const multer = require("multer");
 
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
   filename:function(req,file,cb){
    cb( null, file.originalname );
   }
});

const imageUpload = multer({
    storage: imageStorage,
     
}) 

module.exports={imageUpload}