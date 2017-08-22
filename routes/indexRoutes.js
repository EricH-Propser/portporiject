var express = require("express");
var router = express.Router();
var post = require("../models/post.js");
router.get("/",function(req,res){
    res.render("indexRoutes/homepage")
})
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
router.get("/index",function(req,res){
    post.find({},function(err,allposts){
        if(err){
            console.log(err)
        }else{
        res.render("postRoutes/index",{user:req.user,allposts:allposts,type:"all"})
    
            }
        })
    
})
router.post("/index/search",function(req,res){
    post.find({},function(err,allposts){
        if(err){
            console.log(err)
        }else{
            console.log(allposts[1])
        res.render("postRoutes/index",{user:req.user,allposts:allposts,type:req.body.type})
    
            }
        })
    
})
router.get("/index/tags/:name",function(req,res){
    post.find({ tags: { "$in" : [req.params.name]} }, function(err,found){
        if(err){
            console.log(err)
        }
        else{
            console.log(found)
           res.render("indexRoutes/tagsearch",{found:found,name:req.params.name})
        }
        
    });
    
})
module.exports = router;