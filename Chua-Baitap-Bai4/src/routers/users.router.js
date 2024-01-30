const {
  getAllUsers,
  getUserById,
  updateUser,
  addUser,
  deleteUser,
} = require("../controllers/user.controller");

const endPointUser = "/api/v1/user";
const userRoute = (app) => {
  // get all user
  app.get(endPointUser, getAllUsers);
  //get 1 user
  app.get(`${endPointUser}/:id`, getUserById);
  //add user
  app.post(endPointUser, addUser);
  //update user by id or email
  app.patch(`${endPointUser}/:id`, updateUser);
  //delete user by id or email
  app.delete(`${endPointUser}/:id`, deleteUser);
};

module.exports = userRoute;
