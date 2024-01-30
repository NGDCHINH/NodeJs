const {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const endPointUser = "/api/v1/products";
const productRoute = (app) => {
  // get all user
  app.get(endPointUser, getAllProduct);
  //get 1 user
  app.get(`${endPointUser}/:id`, getProductById);
  //add user
  app.post(endPointUser, addProduct);
  //update user by id or email
  app.patch(`${endPointUser}/:id`, updateProduct);
  //delete user by id or email
  app.delete(`${endPointUser}/:id`, deleteProduct);
};

module.exports = productRoute;
