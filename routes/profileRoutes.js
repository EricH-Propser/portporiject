var express = require("express");
var router = express.Router();
var user = require("../models/user.js");
var methodOverride = require("method-override")
var post = require("../models/post.js")
router.use(methodOverride("_method"));
function LoginCheck(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/login");
}
router.get("/profile/:id",LoginCheck,function(req,res){
    post.find({"members":req.user._id},function(err,found){
        if(err){
            console.log(err)
        }else{
             res.render("profileRoutes/profile",{ide:req.params.id,found:found})
        }
    })
   
})
router.get("/profile/:id/edit",LoginCheck,function(req,res){
    res.render("profileRoutes/edit")
})
router.put("/profile/:id/edit",function(req,res){
    var nuser = req.user
    nuser.profile = req.body.profile
    console.log(nuser.profile)
   
    var tags = req.body.profile.skills
    tags.trim
    tags = tags.split(" ")
    nuser.profile.tags = tags
    console.log(nuser)
    user.findByIdAndUpdate(req.params.id, nuser, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          console.log(updatedComment.profile)
          res.redirect("/profile/" + req.params.id );
      }
   });
});

module.exports = router;