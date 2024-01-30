const connection = require("../configs/config.mysql");
const getAllCategories = (req, res) => {
  connection.query("SELECT * FROM categories", (error, result) => {
    if (error) {
      throw new Error(error);
    }
    res.status(200).json(result);
  });
};
const getCategoriesById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM categories WHERE category_id = ?",
    id,
    (error, result) => {
      if (error) {
        console.log("loi me m roi", error);
        res.status(400).json({
          message: "lay thong tin that bai",
        });
      }
      console.log(result);
      res.status(200).json({
        message: "lay thong tin thanh cong",
        data: result,
      });
    }
  );
};

const addCategory = (req, res) => {
  const { category_name } = req.body;
  connection.query(
    "INSERT INTO categories (category_name) VALUES (?)",
    [category_name],
    (error, result) => {
      if (error) {
        console.log("loi me m roi", error);
        res.status(400).json({
          message: "tao moi that bai",
        });
      }
      res.status(200).json({
        message: "tao moi thanh cong",
      });
    }
  );
};
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  connection.query(
    "UPDATE categories SET ? WHERE category_id = ?",
    [{ category_name }, id],
    (error, result) => {
      if (error) {
        console.log("loi me m roi", error);
        res.status(400).json({
          message: "cap nhap that bai",
        });
      }
      res.status(203).json({
        message: "cap nhap thanh cong",
      });
    }
  );
};
const deleteCategory = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM users WHERE category_id = ?",
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
};
module.exports = {
  getAllCategories,
  getCategoriesById,
  addCategory,
  updateCategory,
  deleteCategory,
};
