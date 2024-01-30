const {
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/user.controller");

const endPointUser = "/api/v1/user";
const userRoute = (app) => {
  // get all user
  app.get(endPointUser, getAllUsers);
  //get 1 user
  app.get(`${endPointUser}/:id`, getUserById);
  //add user
  app.post(endPointUser, updateUser);
  //update user by id or email
  app.patch(`${endPointUser}/:id`, (req, res) => {
    const { id } = req.params;
    const { user_name, email, pass_word } = req.body;
    connection.query(
      "UPDATE users SET ? WHERE user_id = ?",
      [{ user_name, email, pass_word }, id],
      (error, result) => {
        if (error) {
          console.log("loi me m roi", error);
          res.status(400).json({
            message: "lay thong tin that bai",
          });
        }
        res.status(203).json({
          message: "cap nhap thanh cong",
        });
      }
    );
  });
  //delete user by id or email
  app.delete(`${endPointUser}/:id`, (req, res) => {
    const { id } = req.params;
    const { user_name, email, pass_word } = req.body;
    connection.query(
      "DELETE FROM users WHERE user_id = ?",
      id,
      (error, result) => {
        if (error) {
          console.log("loi me m roi", error);
          res.status(400).json({
            message: "xoa that bai",
          });
        }
        res.status(200).json({
          message: "xoa thanh cong",
        });
      }
    );
  });
};

module.exports = userRoute;
