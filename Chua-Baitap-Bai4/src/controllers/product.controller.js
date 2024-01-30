const connection = require("../configs/config.mysql");
const getAllProduct = (req, res) => {
  connection.query("SELECT * FROM products", (error, result) => {
    if (error) {
      throw new Error(error);
    }
    res.status(200).json(result);
  });
};
const getProductById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM products WHERE product_id = ?",
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

const addProduct = (req, res) => {
  const { product_name, origin_price } = req.body;
  connection.query(
    "INSERT INTO products (product_name, origin_price) VALUES (?,?)",
    [product_name, origin_price],
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
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { category_name, origin_price } = req.body;
  connection.query(
    "UPDATE products SET ? WHERE product_id = ?",
    [{ category_name, origin_price }, id],
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
const deleteProduct = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM products WHERE product_id = ?",
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
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
