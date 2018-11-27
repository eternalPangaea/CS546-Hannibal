const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
const uuid = require("uuid/v4");

const exportedMethods = {
	async getAllProducts(){
		const productsCollection = await products();
		let productsList = await productsCollection.find({}).toArray();
		let result = [];
		for(let i = 0; i < productsList.length; i++){
			let temp = {"product_id":productsList[i].product_id, "name":productsList[i].name};
			result.push(temp);
		}
		return result;
	},

	async getProductById(id){
		const productsCollection = await products();
		const product = await productsCollection.findOne({_id:id});
		if(!product) throw "product not found";
		return product;
	},

	async addProduct(name, price, description, pics, contact_email, category_id){
		if(typeof name != "string") throw "No product's name provided";
		if(typeof price != "number") throw "No product's price provided";
		if(typeof description != "string") throw "No product's description provided";
		if (!Array.isArray(pics)) throw "No product's pictures provided";
		if(typeof contact_email != "string") throw "No product's contact_email provided";
		if(typeof category_id != "number") throw "No product's category_id provided";

		const productsCollection = await products();
		
		const newProduct = {
			_id: uuid(),//product_id
			name: name,
			price: price,
			description: description,
			pics: pics,
			contact_email: contact_email,
			category_id: category_id,
			video:null,
			auto_email:null
		};

		const newProductInfo = await productsCollection.insertOne(newProduct);
		return newProduct;
	}
}

module.exports = exportedMethods;