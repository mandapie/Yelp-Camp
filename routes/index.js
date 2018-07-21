var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();

/** home page **/
router.get("/", function (req, res) {
    res.render("campgrounds/landing");
});

/** register form **/
router.get("/register", function(req, res) {
    res.render("register");
});

/** register user **/
router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, newUser) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

/** login form **/
router.get("/login", function(req, res) {
    res.render("login");
});

/** handle login logic **/
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

/** logout route **/
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;