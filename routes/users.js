const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 16;
const data = require("../data");
const userData = data.users;

router.post("/", async(req, res) => {
	try{
		const upload = req.body;
		if(await userData.checkUsername(upload.user_name)){
			const hashpass = await bcrypt.hash(upload.user_pass,saltRounds);
			let result = await userData.addUser(upload.user_name, hashpass, upload.contact_email);
			res.redirect("/hannibal/login");
		}
		else{
			res.render("users/signup", {message:"This username has been taken."});
		}
	}
	catch(e){
		res.redirect("/hannibal/signup");
	}
});

router.post("/login", async(req, res) => {
	try{
		const upload = req.body;
		var userInfo = await userData.getUserByName(upload.user_name);
		if(await bcrypt.compare(upload.user_pass, userInfo.user_pass)){
			req.session.user = {"user_id":userInfo._id};
			//console.log(req.session);
			res.status(200).redirect("http://localhost:3000/hannibal/");
			//res.status(200).render("index",{"user": req.session.user});
		}
		else{
			res.status(201).render("users/login", {message:"username/password is not correct!"});
		}
	}
	catch(e){
		res.status(202).render("users/login", {message:"account doesn't exist!"});
	}
});

router.get("/email/:id", async(req, res) => {
	try{
		const email = await userData.getEmailById(req.params.id);
		res.json(email);
	}
	catch(e){
		res.status(500).json({error: e});
	}
});



module.exports = router;