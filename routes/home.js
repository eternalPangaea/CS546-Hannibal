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
		 	var category_product = {};
            try{var IdName = await categoryProductData.getPostById(categoriesList[i]._id);}
            catch(e){ var IdName = null}

            category_product.category_name = await categoriesList[i].name;
            category_product.IdandNames=[];
            if(IdName != null){
            for(var n = 0;n <IdName.product_ids.length; n++){
                category_product.IdandNames.push({product_id:IdName.product_ids[n],product_name:IdName.names[n],product_pic:IdName.pics[n]});
            }

            }  
            await category_products.push(category_product);
		}
		if(req.session.user)
			await res.render('index',{"category_products":category_products, "user_id":req.session.user.user_id});
		else
			await res.render('index',{"category_products":category_products});
	}
	catch(e){
		console.log(e);
		res.status(500).json({error: e});
	}
});

router.get("/*", async(req, res) => {
  res.redirect("http://localhost:3000/hannibal/");
});

module.exports = router;