const express = require("express");
const router = express.Router();

const data = require("../data");
const post_itemsData = data.postItems;



router.get("/:id", async (req, res) => {
  try {
    const product = await post_itemsData.getPostById(req.params.id);
    let result = [];
    for(let i = 0; i < product.names.length; i++){
    	result[i] = {"name":product.names[i], "product_id":product.product_ids[i]};
    }
    //console.log(result);
    res.render('products/allProducts',{"products": result});
  } catch (e) {
  	//check whether the user_id exist?
  	result = [];
  	result.name = "";
  	result.product_id="";
    res.render('products/allProducts',{"products": result});
  }
});


module.exports = router;