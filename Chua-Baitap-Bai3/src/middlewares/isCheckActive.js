const path = require(`node:path`);
const fs = require(`node:fs`);
const isCheckActive = (req, res, next) => {
    //FIX cung truong hop vau test

    //doc data
    const pathUser = path.join(__dirname, `../../data/user.json`);
    const dataJsonUser = fs.readFileSync(pathUser, "utf-8");
    const listUser = JSON.parse(dataJsonUser);
    const dataTest = listUser.find((user)=> user._id == 1)
    //***
    req.dataTest = dataTest

    if (req.dataTest.active){
        next()
    } else {
        res.status(304).send("Your account is not active")
    }
}

module.exports = isCheckActive