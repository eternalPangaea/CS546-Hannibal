const express = require("express");
const router = express.Router();

const data = require("../data");
const userData = data.users;

router.post("/", async(req, res) => {
	try{
		const upload = req.body;
		let result = await userData.addUser(upload.user_name, upload.user_pass, upload.contact_email);
		res.json(result);
	}
	catch(e){
		res.status(500).json({error: e});
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