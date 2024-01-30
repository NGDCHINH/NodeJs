const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "manager_product",
  password: "147258369aA",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
});

module.exports = connection;
