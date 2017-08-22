var express    = require("express"), 
    app        = express(), 
    bodyParser = require("body-parser"), 
    mongoose   = require("mongoose"),
    post = require("../models/post"),
    message = require("../models/messages");
    var router = express.Router()
   var methodOverride = require("method-override")
    router.use(methodOverride("_method"));
    
    
function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next()
    };
    res.redirect("/login")
}
var express = require("express");
var router = express.Router();

router.get("/profile/:id/newmessage",isLoggedin, function(req,res){
    res.render("messageRoutes/newmessage.ejs",{id:req.params.id})
    console.log("at profile")
})


router.get("/profile/:id/messages",isLoggedin, function(req,res){
   message.find({"author.id":req.params.id},function(err,sent){
       if(err){
           console.log(err)
       }else{
    message.find({"receiver.id":req.params.id},function(err,received){
        if(err){}
        else{
        console.log(received)
        console.log(sent)
         res.render("messageRoutes/messages",{messages:received,sent:sent})    
            
        }})
       }
   
})})
router.delete("/messages/:id", function(req,res){
    message.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/")
        }else{
            res.redirect("back")
        }
    })
})


router.post("/profile/:id/messages",isLoggedin, function(req,res){
    var text = req.body.message;
    text.author = {id:req.user._id,username:req.user.username}
    text.receiver = {id:req.params.id}
    message.create(text,function(err,message){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/")
            
        }
    })
    
    
    
    
    
})

module.exports = router
