const productRoutes = require("./products");
const post_itemsRoutes = require("./post_items");
const userRoutes = require("./users");

const constructorMethod = app => {

  app.use("/hannibal/product", productRoutes);
  app.use("/hannibal/user", userRoutes);
  app.use("/hannibal/postItems",post_itemsRoutes);

  //this is upload a product
  app.use("/hannibal/upload", (req, res) =>{
	res.render("products/uploadProduct",{
		partial:"showEmail"
	});
  });

  //sign up
  app.use("/hannibal/signup", (req, res) =>{
  	res.render("users/signup"
  	);
  });



  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;