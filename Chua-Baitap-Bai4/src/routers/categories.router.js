const {
  getAllCategories,
  getCategoriesById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const endPointUser = "/api/v1/category";
const categoryRoute = (app) => {
  // get all user
  app.get(endPointUser, getAllCategories);
  //get 1 user
  app.get(`${endPointUser}/:id`, getCategoriesById);
  //add user
  app.post(endPointUser, addCategory);
  //update user by id or email
  app.patch(`${endPointUser}/:id`, updateCategory);
  //delete user by id or email
  app.delete(`${endPointUser}/:id`, deleteCategory);
};

module.exports = categoryRoute;
