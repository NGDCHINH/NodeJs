const bodyParser = require('body-parser')
const express = require('express')
const fs = require("node:fs")
const app = express()
const PORT = 8800

app.use(express.json())
app.use(bodyParser.urlencoded({extended :false}))
app.use(bodyParser.json())
// tạo ra router
app.get('/api/v1/home', (req, res) => {
  res.send('Hello Express!')
})
app.post('/api/v1/login', (req, res) => {
    if(Object.keys(req.body).length > 0){
        res.send("login thành công")
    } else {
        res.send("login thất bại")
    } 
})
app.get("/api/v1/product/:id", (req, res)=>{
    console.log("product detail",req.params.id);
    res.json({
        id : req.params.id,
        name : "product 1",
        price : 100,
    })
})
app.get('/api/v1/user', (req, res)=>{
    console.log(req.query.email);
    const dataJson = fs.readFileSync("./data/user.json", "utf-8")
    const data = JSON.parse(dataJson)
    const user = data.find((u)=> u.email == req.query.email)
    if ( user ) {
        res.json({
            message : "tìm kiếm thành công",
            data : user,
        })
    } else {
        res.json({
            message: "không tìm thấy user",
        })
    }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})