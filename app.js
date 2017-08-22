
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrat            = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user.js"),
    indexRoutes           = require("./routes/indexRoutes"),
    authRoutes           = require("./routes/authRoutes"),
    profileRoutes       = require("./routes/profileRoutes"),
    postRoutes          = require("./routes/postRoutes"),
    flash                = require("connect-flash"),
    messageRoutes      = require("./routes/messagesRoutes"),
    inviteRoutes      = require("./routes/inviteRoutes");
var app = express();
//required to use body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "fmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmmlmlmlmmlmlmlmlmlmlmlmmmlmlmlmlmlmm",
    resave:false,
    saveUnitialized: false
}))
mongoose.connect("mongodb://admin:root@ds127063.mlab.com:27063/profproject")
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
mongoose.Promise = global.Promise;

passport.serializeUser(User.serializeUser());
passport.use(new LocalStrat(User.authenticate()));
passport.deserializeUser(User.deserializeUser())
app.use(flash());
app.use(function(req, res, next){
   res.locals.currentuser = req.user;
   next();
});
app.use(function(req,res,next){
    res.locals.ide = req.params.id
    next()
})

app.use(express.static(__dirname + "/public"))
app.use(indexRoutes)
app.use(authRoutes)
app.use(profileRoutes)
app.use(messageRoutes)
app.use(postRoutes)
app.use(inviteRoutes)
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Site started")
})