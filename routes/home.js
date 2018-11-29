const express = require("express");
const router = express.Router();
const data = require("../data");
const categoryData = data.categories;
const categoryProductData = data.categoryProducts;

router.get("/", async(req, res) => {
	try{
		const categoriesList = await categoryData.getAllcategories();
		const category_products = [];
		
		 for(var i = 0; i < categoriesList.length;i++){
            console.log(categoriesList[i]._id);
            var category_product = await categoryProductData.getPostById(categoriesList[i]._id);

            category_product.category_name = await categoriesList[i].name;
            await category_products.push(category_product);
		}
		await res.render('index',{"category_products":category_products});
	}
	catch(e){
		console.log(e);
		res.status(500).json({error: e});
	}
});
module.exports = router;