const followHelper = require("../Models/helpers/FollowHelper")

const followAUser =(req,res)=>{
    let currentUser = req.session.userId;
    let targetUser = req.params.target
    followHelper.following(currentUser,targetUser).then((result)=>{
        console.log(result)
        res.status(200).json({result:true})
    }).catch((err)=>{
        console.log(err)
        res.status(401).json({apiError:err})
    })
}

const unFollowAUser =(req,res)=>{
    let currentUser = req.session.userId;
    let targetUser = req.params.target
    followHelper.unFollow(currentUser,targetUser).then((result)=>{
        console.log(result)
        res.status(200).json({result:true})
    }).catch((err)=>{
        console.log(err)
        res.status(401).json({apiError:err})
    })
}

// get user all followers

const getFollowers = (req,res)=>{
    let userId = req.session.userId
    
    req.session.destroy()

    followHelper.getAllFollowers(userId).then((result)=>{
        console.log(result)
        res.status(200).json({result:result})
    }).catch((err)=>{
        res.status(401).json({apiError:err})
    })
}

module.exports={followAUser,unFollowAUser,getFollowers}