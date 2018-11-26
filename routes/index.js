const productRoutes = require("./products");


const constructorMethod = app => {
  app.use("/hannibal/product", productRoutes);
 
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;