const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const listUser = await userService.getAllUserService();
    res.status(200).json({
      message: "lay thong tin thanh cong",
      data: listUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi me may roi",
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const listUser = await userService.getOneUserByIdService(id);
    if (!listUser[0]) {
      return res.status(404).json({
        message: "khong tim thay user",
      });
    }
    res.status(200).json({
      message: "lay thong tin thanh cong",
      data: listUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi me may roi",
      error: error.message,
    });
  }
};

const addUser = async (req, res) => {
  const { user_name, gender, date_of_birth, address, email, pass_word } =
    req.body;
  const newData = {
    user_name,
    gender,
    date_of_birth,
    address,
    email,
    pass_word,
  };
  try {
    const listUser = await userService.addUserService(newData);
    res.status(200).json({
      message: "tao moi thanh cong",
      data: listUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi me may roi",
      error: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, gender, date_of_birth, address, email, pass_word } =
    req.body;
  const newData = {
    user_name,
    gender,
    date_of_birth,
    address,
    email,
    pass_word,
  };
  try {
    const listUser = await userService.updateUserService(id, newData);
    res.status(200).json({
      message: "cap nhap thanh cong",
      data: listUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "cap nhap that bai",
    });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUserService(id);
    res.status(200).json({
      message: "Xoa thanh cong",
    });
  } catch (error) {
    res.status(400).json({
      message: "Xoa that bai",
    });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
