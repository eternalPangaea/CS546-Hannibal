const mongoCollections = require("../config/mongoCollections");
const post_items = mongoCollections.postItems;

const exportedMethods = {

	async getPostById(user_id){
		const post_itemsCollection = await post_items();
		const post = await post_itemsCollection.findOne({user_id: user_id});
		if(!post) throw "product not found";
		return post;
	},

	async addPost(user_id, product_id, name){
		const post_itemsCollection = await post_items();
		let product_idList = [];
		let nameList = [];
		product_idList.push(product_id);
		nameList.push(name);
		const newPost = {
			user_id: user_id,
			product_ids: product_idList,
			names: nameList
		};

		const newPostInfo = await post_itemsCollection.insertOne(newPost);
		return newPost;
	},

	async updatePost(user_id, product_id, name){
		const post_itemsCollection = await post_items();
		const updatePostData = {};
		oldPost = await this.getPostById(user_id);
		
		let newIdList = oldPost.product_ids;
		let newNameList = oldPost.names;
		newIdList.push(product_id);
		newNameList.push(name);

		
		updatePostData.product_ids = newIdList;
		updatePostData.names = newNameList;
	
		let updateCommand = {
	      $set: updatePostData
	    };

	    await post_itemsCollection.updateOne({"user_id": user_id}, updateCommand);
	    return await this.getPostById(user_id);
	}

}

module.exports = exportedMethods;