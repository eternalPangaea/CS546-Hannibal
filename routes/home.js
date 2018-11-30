const express = require("express");
const router = express.Router();
const data = require("../data");
const categoryData = data.categories;
const categoryProductData = data.categoryProducts;

router.get("/", async(req, res) => {
	try{
		const categoriesList = await categoryData.getAllcategories();
		const category_products = [];
		var category_product = {};
		 for(var i = 0; i < categoriesList.length;i++){
            try{var category_product = await categoryProductData.getPostById(categoriesList[i]._id);}
            catch(e){}

            category_product.category_name = await categoriesList[i].name;
            await category_products.push(category_product);
            category_product = {};
		}
		await res.render('index',{"category_products":category_products});
	}
	catch(e){
		console.log(e);
		res.status(500).json({error: e});
	}
});
module.exports = router;