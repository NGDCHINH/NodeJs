const connection = require("../configs/config.mysql");

const userService = {
  getAllUserService: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      });
    });
  },

  getOneUserByIdService: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_id = ?",
        [id],
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },

  addUserService: (newData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users SET ?",
        [newData],
        (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  updateUserService: (id, newData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE user_id = ?",
        [newData, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  deleteUserService: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM users WHERE user_id = ?",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
};

module.exports = userService;
