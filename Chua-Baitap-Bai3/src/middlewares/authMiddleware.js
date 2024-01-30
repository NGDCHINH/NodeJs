const path = require(`node:path`)
const fs = require(`node:fs`)


const authMiddleware = (req, res, next)=>{
    //b1 lay id va content
    const idUser = req.params.id
    const pathQ = path.join(__dirname, `../../data/questions.json`)
    const dataJsonQ = fs.readFileSync(pathQ, "utf-8")
    const dataQ = JSON.parse(dataJsonQ)
    const dataQbyID = dataQ.find(q => q.id == idUser)
    
    if (dataQbyID) {
        next()
    } else {
        res.status(400).send("Khong ton tai id nay")
    }
}

module.exports = authMiddleware