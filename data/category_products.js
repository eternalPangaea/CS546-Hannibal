const mongoCollections = require("../config/mongoCollections");
const category_products = mongoCollections.categoryProducts;

const exportedMethods = {
	async getPostById(category_id){
		const category_productsCollection = await category_products();
		const post = await category_productsCollection.findOne({category_id: category_id});
		if(!post) throw "product not found";
		return post;
	},

	async addPost(category_id, product_id, name){
		const category_productsCollection = await category_products();
		let product_idList = [];
		let nameList = [];
		product_idList.push(product_id);
		nameList.push(name);
		const newPost = {
			category_id: category_id,
			product_ids: product_idList,
			names: nameList
		};

		const newPostInfo = await category_productsCollection.insertOne(newPost);
		return newPost;
	},

	async updatePost(category_id, product_id, name){
		const category_productsCollection = await category_products();
		const updatePostData = {};
		oldPost = await this.getPostById(category_id);
		
		let newIdList = oldPost.product_ids;
		let newNameList = oldPost.names;
		newIdList.push(product_id);
		newNameList.push(name);

		updatePostData.product_ids = newIdList;
		updatePostData.names = newNameList;
	
		let updateCommand = {
	      $set: updatePostData
	    };

	    await category_productsCollection.updateOne({"category_id": category_id}, updateCommand);
	    return await this.getPostById(category_id);
	}
}

module.exports = exportedMethods;