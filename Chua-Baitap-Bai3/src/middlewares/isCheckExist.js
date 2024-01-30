const path = require(`node:path`)
const fs = require(`node:fs`)


const isCheckExist = (req, res, next)=>{
    //b1 lay id va email
    const idUser = req.query.id;
    const emailUser = req.query.email;
    //b2 doc data
    const pathUser = path.join(__dirname, `../../data/user.json`)
    const dataJsonUser = fs.readFileSync(pathUser, "utf-8")
    const listUser = JSON.parse(dataJsonUser)
    //b3 kiem tra
    const findUserById = listUser.find(user => user._id == idUser)
    const findUserByEmail = listUser.find(user => user.email == emailUser)
    //b4
    if (findUserById && findUserByEmail){
        next()
    } else {
        res.status(404).send("Not found")
    }

}

module.exports = isCheckExist