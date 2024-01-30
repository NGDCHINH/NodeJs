const bodyParser = require('body-parser');
const express = require('express')
const fs = require(`node:fs`)
const path = require(`node:path`)
const app = express();
const isCheckActive = require("./middlewares/isCheckActive")
const isCheckExist = require("./middlewares/isCheckExist")

//middleware global
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/api/v1/product", isCheckActive,( req , res ) => {
    // res.status(200)
    // res.send("This is Product")

    res.status(200).json({
        mesage : "ok",
        data : [
            {
                id: 1,
                name : "Banana",
                price : 200,
            }
        ]
    })
})
//get all user
app.get("/api/v1/user", isCheckExist, ( req , res )=>{
    const pathUser = path.join(__dirname,`../data/user.json`)
    const data = fs.readFileSync(pathUser, "utf-8")
    res.status(200).json(
        JSON.parse(data)
    )
})
//get user by id
app.get("/api/v1/user/:id", ( req , res )=>{
    const userId = req.params.id;
    console.log(userId);
    const pathUser = path.join(__dirname,`../data/user.json`)
    const dataUser = fs.readFileSync(pathUser, "utf-8")
    const data = JSON.parse(dataUser)
    const user = data.find(user => user._id == userId)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400).json({
            message : "User not found"
        })
    }
})
//SignUp bang email
app.post("/api/v1/user", ( req , res )=>{
    const dataUser = req.body;
    console.log(dataUser);
    const dataEmail = fs.readFileSync(path.join(__dirname,`../data/user.json`), "utf-8")
    const data = JSON.parse(dataEmail)
    const checkEmail = data.find(user => user.email == dataUser.email)
    if (checkEmail) {
        res.status(200).send("Email already exists")
    } else {
        data.push(dataUser)
        fs.writeFileSync(path.join(__dirname, `../data/user.json`), JSON.stringify(data))
        res.status(200).send("Sign up successfully")
    }
})
//update user
app.patch("/api/v1/user/:id", isCheckExist, ( req , res )=>{
    const userId = req.params.id;
    const dataUser = req.body
    console.log(userId);
    const pathUser = path.join(__dirname,`../data/user.json`)
    const readDataUser = fs.readFileSync(pathUser, "utf-8")
    const data = JSON.parse(readDataUser)
    const checkID = data.find(user => user._id == userId)
    if (checkID) {
        checkID.name = dataUser.name
        checkID.email = dataUser.email
        checkID.password = dataUser.password
        fs.writeFileSync((pathUser), JSON.stringify(data))
        res.status(200).send("Update successfully")
    } else {
        res.status(400).send("User not found")
    }

})
//Delete user
app.delete("/api/v1/user/:id",isCheckExist, (req, res) => {
    const userId = req.params.id;
    const pathUser = path.join(__dirname, `../data/user.json`);
    const readDataUser = fs.readFileSync(pathUser, "utf-8");
    const data = JSON.parse(readDataUser);
    const userToDelete = data.find(user => user._id == userId);

    if (!userToDelete) {
        return res.status(404).send("User not found");
    } else {
        const dataNotDelete = data.filter(user => user._id != userId);
        fs.writeFileSync(pathUser, JSON.stringify(dataNotDelete));
        res.status(200).send("Delete successfully");
    }
    
});


//Router khac
app.get("/", ( req , res )=>{
    res.status(200).send("This is HomePage")
})
app.get("/overview", ( req , res )=>{
    res.status(200).send("This is OverviewPage")
})
app.get("/product", ( req , res )=>{
    res.status(200).send("This is ProductPage")
})



app.get("*", ( req , res )=>{
    res.status(404).send("Page not found")
})

const PORT = 8800
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost/${PORT}`);
})