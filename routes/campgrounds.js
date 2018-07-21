var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();

/** show all campgrounds **/
router.get("/", function (req, res) {
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

/** add new campground form **/
router.get("/new", isLoggedIn, function (req,res) {
    res.render("campgrounds/new");
});

/** add a new campground **/
router.post("/", isLoggedIn, function (req, res) {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.desc,
        author: {id: req.user._id, username: req.user.username}
    }, function(err, newCampground) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

/** show full details of a campground **/
router.get("/:id", function (req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campgroundId) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", {campground: campgroundId});
        }
    });
});

/** edit a campground form **/
router.get("/:id/edit", isCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, campgroundId) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/edit", {campground: campgroundId});
        }
    });
});

/** update a campground **/
router.put("/:id", isCampgroundOwner, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campgroundId) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

/** delete a campground **/
router.delete("/:id", isCampgroundOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
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

/** check if user is the creator of the campground **/
function isCampgroundOwner(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, campgroundId) {
            if (err) {
                res.redirect("back");
            }
            else {
                if(campgroundId.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
}

module.exports = router;