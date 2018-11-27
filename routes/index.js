var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Signed Up! Nice to meet you" + user.username);
            res.redirect("/"); 
         });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome to Hannibal!"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/");
 });

 router.get("/user/reset/:id", function(req, res){
    res.render("reset", {id: req.params.id});
});

router.post("/user/reset/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        if (req.body.password === req.body.confirm){
            user.setPassword(req.body.password, function(err){
                user.save(function(err){
                    req.logIn(user, function(err){
                        req.flash("success","Success! Your password has been changed!");
                        res.redirect("/");
                    });
                });
            });
        } else {
            req.flash("error", "Password do not match");
            return res.redirect("/");
        }
    });
});

 router.get("/user/:id", function(req, res){
    res.render("user", {id: req.params.id});
 });

 router.post("/user/:id", function(req, res){
    User.findByIdAndUpdate(req.params.id, { $set: { email: req.body.email }}, function(err, result){
        if(err) {
            req.flash("error", "User Not Found!");
        }
        req.flash("success", "Successfully changed email!");
        res.redirect("/");
    });

 });


 
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     req.flash("error", "Please Login First!");
     res.redirect("/login");
}

module.exports = router;