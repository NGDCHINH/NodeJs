const mysql2 = require('mysql2')

// khỏi tạo kết nối
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "demo_connect",
    password: "147258369aA"
})

// kiểm tra kết nối
connection.connect((err)=>{
    if (err) {
        console.log(err);
        return
    }
    console.log("Database connected");
})

// export để sử dụng
module.exports = connection;