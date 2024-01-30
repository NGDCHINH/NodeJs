const categoryRoute = require("./categories.router");
const productRoute = require("./products.router");
const userRoute = require("./users.router");

const rootRouter = (app) => {
  userRoute(app);
  categoryRoute(app);
  productRoute(app);
};

module.exports = rootRouter;
