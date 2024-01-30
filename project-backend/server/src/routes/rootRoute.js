const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const categoryRoute = require("./category.route");
const rootRoute = (app) => {
  authRoute(app);
  productRoute(app);
  cartRoute(app);
  categoryRoute(app);
};

module.exports = rootRoute;
