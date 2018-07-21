var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router({mergeParams: true}); //merges the campground id to comments.js

/** add a comment form**/
router.get("/new", isLoggedIn, function(req,res) {
    Campground.findById(req.params.id, function(err, campgroundId) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campgroundId});
        }
    });
});

/** add a comment to a campground **/
router.post("/", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campgroundId) {
        if (err) {
            console.log(err);
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campgroundId.comments.push(comment);
                    campgroundId.save();
                    res.redirect("/campgrounds/" + campgroundId._id);
                }
            });
        }
    });
});

/** edit comment form **/
router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, commentId) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment: commentId});
        }
    });
});

/** update a comment route **/
router.put("/:comment_id", function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, commentId) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

/** delete a comment **/
router.delete("/:comment_id", function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

/** check if user is logged in **/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;