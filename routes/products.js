const express = require("express");
const router = express.Router();
const data = require("../data");
const productData = data.products;
const post_itemsData = data.postItems;
const category_productsData = data.categoryProducts;

router.get("/", async(req, res) => {
	try{
		const productsList = await productData.getAllProducts();
		res.json(productsList);
		//res.render("products/list",);
	}
	catch(e){
		res.status(500).json({error: e});
	}
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productData.getProductById(req.params.id);
    res.json(product);
  } catch (e) {
    res.status(404).json({ error: "Product not found" });
  }
});

router.post("/", async(req, res) => {
	const mutilParts = req.body;
	try{
		if(typeof mutilParts.name != "string") throw "No product's name provided";
		if(typeof mutilParts.price != "number") throw "No product's price provided";
		if(typeof mutilParts.description != "string") throw "No product's description provided";
		if (!Array.isArray(mutilParts.pics)) throw "No product's pictures provided";
		if(typeof mutilParts.contact_email != "string") throw "No product's contact_email provided";
		if(typeof mutilParts.category_id != "number") throw "No product's category_id provided";
		if(typeof mutilParts.user_id != "string") throw "Invaild user_id provided";

		const newProduct = await productData.addProduct(mutilParts.name, mutilParts.price, mutilParts.description, mutilParts.pics, mutilParts.contact_email, mutilParts.category_id);
		try{
			const newPost1 = await post_itemsData.updatePost(mutilParts.user_id, newProduct._id, newProduct.name);
		}
		catch(e){
			const newPost2 = await post_itemsData.addPost(mutilParts.user_id, newProduct._id, newProduct.name);
		}

		try{
			const newPost3 = await category_productsData.updatePost(newProduct.category_id, newProduct._id, newProduct.name);
		}
		catch(e){
			const newPost4 = await category_productsData.addPost(newProduct.category_id, newProduct._id, newProduct.name);
		}
		res.json(newProduct);
		//add post_items the user_id and product_id and also catrgory_products
	}
	catch(e){
		res.status(500).json({error: e});
	}
});

module.exports = router;