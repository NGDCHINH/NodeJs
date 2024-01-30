const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "147258369aA",
  database: "project_md3",
});
connection.connect((err) => {
  if (err) {
    console.log("lỗi kết nối với mysql");
    return err;
  }
  console.log("kết nối thành công");
});
module.exports = connection;
