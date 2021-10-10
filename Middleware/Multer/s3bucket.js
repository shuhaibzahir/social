const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
var multer = require('multer')
var multerS3 = require('multer-s3')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.SECRET_KEY_AWS
}) 
 
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUKKET_NAME ,
    acl: 'public-read',
     metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        let extrauiid = uuidv4()
      cb(null,extrauiid+"@"+file.originalname)
    }
  })
})


const deleteFromS3 = (key)=>{
 
    s3.deleteObject({ Bucket:process.env.BUKKET_NAME , Key:key }, (err, data) => {
       if(err){
        
           return {status:false,data:err}
       } else{
        
        return {status:true, data:"data deleted"}
       }
    });
}
module.exports={upload ,deleteFromS3}