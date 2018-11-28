const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 16;
const data = require("../data");
const userData = data.users;

router.post("/", async(req, res) => {
	try{
		const upload = req.body;
		if(await userData.getUserByName(upload.user_name)){
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