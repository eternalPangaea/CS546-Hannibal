var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    flash = require("connect-flash")
    //seedDB = require("./seeds");

var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/db");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
    secret: "Hannibal Website for CS546",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// passport.use('local.signup', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     emailField: 'email',
//     passReqToCallback: true
// }, function(req, username, password, email, done){
//     req.checkBody('username','username invaild').notEmpty().isLength({min:4});
//     req.checkBody('password','password invaild').notEmpty().isLength({min:4});
//     var errors = req.validationErrors();
//     if(errors){
//         var messages = [];
//         errors.forEach(function(error){
//             messages.push(error.msg);
//     });
//     return done(null, false, req.flash(err, messages));
//     }
// }));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);

app.listen(3000, function(){
    console.log("Your routes will be running on http://localhost:3000");
    console.log("The Yelpcamp Server Has Started!");
})