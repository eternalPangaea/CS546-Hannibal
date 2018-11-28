const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("uuid/v4");

const exportedMethods = {
	async addUser(name,pass,email){
		const userCollection = await users();
		const newUser = {
			_id: uuid(),
			user_name: name,
			user_pass: pass,
			contact_email: email
		};

		const newUserInfo = await userCollection.insertOne(newUser);
		return newUser;
	},

	async getEmailById(user_id){
		const userCollection = await users();
		const result = await userCollection.findOne({_id: user_id});
		return result.contact_email;
	}
}


module.exports = exportedMethods;