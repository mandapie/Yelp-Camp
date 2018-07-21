/* require packages */
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrat = require("passport-local");
var methodOverride = require("method-override");

/* require models */
var User = require("./models/user");
// var seedDB = require("./seeds");

/* require routes */
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/index");

/* express setups */
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/yelpCamp", { useNewUrlParser: true });
// seedDB(); //drop and create database

/* passport configurations */
app.use(require("express-session")({
    secret: "Just A Secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* middleware */
/** get req.user object **/
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* use routes */
app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP);