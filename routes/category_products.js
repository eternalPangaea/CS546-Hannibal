const express = require("express");
const router = express.Router();
const data = require("../data");
const categoryProductData = data.categoryProducts;


router.get("/:id", async (req, res) => {
  try {
    const categoryProduct = await categoryProductData.getPostById(req.params.id);
    res.json(categoryProduct);
  } catch (e) {
    res.status(404).json({ error: "categoryProduct not found" });
  }
});

router.post("/", async(req, res) => {
	const mutilParts = req.body;
	try{
		if(typeof mutilParts.name != "string") throw "No product's name provided";
		
		const newCategoryProduct = await categoryProductData.addPost(mutilParts.category_id,mutilParts.product_id,mutilParts.name);

		res.json(newCategoryProduct);
		
	}
	catch(e){
		console.log(e);
		res.status(500).json({error: e});
	}
});
router.patch("/", async(req, res) => {
	const mutilParts = req.body;
	try{
		if(typeof mutilParts.name != "string") throw "No product's name provided";
		
		const newCategoryProduct = await categoryProductData.updatePost(mutilParts.category_id,mutilParts.product_id,mutilParts.name);

		res.json(newCategoryProduct);
		
	}
	catch(e){
		console.log(e);
		res.status(500).json({error: e});
	}
})

module.exports = router;