var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var user = require("../models/user.js")
var passport = require("passport")
router.get("/register",function(req,res){
    res.render("authRoutes/register")
})
router.post("/register", function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/");
        });
    });
});

router.get("/login",function(req,res){
    res.render("authRoutes/login")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}) ,function(req,res){
    
})

router.get("/logout",function(req,res){
    req.logout()
    res.redirect("/")
})
module.exports = router;