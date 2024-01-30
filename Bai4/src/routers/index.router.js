const userRoute = require("./users.route");
const rootRouter = (app) => {
  userRoute(app);
};

module.exports = rootRouter;
