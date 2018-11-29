const homeRoutes = require("./home");
const CategoryRoutes = require("./categories");
const CategoryProduct = require("./category_products");

const constructorMethod = app => {
  app.use("/hannibal", homeRoutes);
  app.use("/hannibal/categories",CategoryRoutes);
  app.use("/hannibal/CategoryProducts",CategoryProduct);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;