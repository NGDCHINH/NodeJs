const express = require('express');
const fs = require(`node:fs`)
const body = require('body-parser')
const path = require(`node:path`)
const authMiddleware = require("./middlewares/authMiddleware")
const app = express();
const PORT = 8801


app.use(body.json())
app.use(body.urlencoded({ extended: true }))

app.get("/api/v1/questions/search", ( req , res )=>{
    const queryQ = req.query.q;
    const pathData = path.join(__dirname, `../data/questions.json`)
    const dataQ = fs.readFileSync(pathData, "utf-8")
    const dataJsonQ = JSON.parse(dataQ)
    const searchQ = dataJsonQ.filter(q => q.content.includes(queryQ))
    if (searchQ) {
        res.status(200).json({
            message : "Day la cau hoi da search",
            data : searchQ
        })
    } else {
        res.status(400).json({
            message : "Khong tim thay cau hoi"
        })
    }
})

//B1
app.get('/api/v1/questions', (req, res) => {
    const pathData = path.join(__dirname, `../data/questions.json`)
    const dataQ = fs.readFileSync(pathData, "utf-8")
    const dataJsonQ = JSON.parse(dataQ)
    res.status(200).json({
        message : "Day la list cau hoi",
        data : dataJsonQ
    })
})
//B2
app.get('/api/v1/questions/:id', authMiddleware, (req, res) => {
    const id = req.params.id
    const pathData = path.join(__dirname, `../data/questions.json`)
    const dataQ = fs.readFileSync(pathData, "utf-8")
    const dataJsonQ = JSON.parse(dataQ)
    const findQbyID = dataJsonQ.find(q => q.id == id)
    if (findQbyID) {
        res.status(200).json({
            message : "Day cau hoi co id la",
            data : findQbyID
        })
    }else {
        res.status(400).json({
            message : "Khong tim thay cau hoi"
        })
    }
})
//B3
app.post('/api/v1/questions', (req, res) => {
    const dataBody = req.body
    console.log(dataBody);
    const pathData = path.join(__dirname, `../data/questions.json`)
    const dataQ = fs.readFileSync(pathData, "utf-8")
    const dataJsonQ = JSON.parse(dataQ)
    const checkContent = dataJsonQ.find(q => q.content == dataBody.content)
    if (checkContent) {
        res.status(400).json({
            message : "Cau hoi da ton tai"
        })
    } else {
        const newQuestion = {
            ...dataBody,
            id: Date.now(),
            
        };
        dataJsonQ.push(newQuestion)
        fs.writeFileSync(pathData, JSON.stringify(dataJsonQ))
        res.status(200).json({
            message : "Them cau hoi thanh cong",
            data : newQuestion
        })
    }
})
//B4
app.patch('/api/v1/questions/:id',authMiddleware, (req, res) => {
    const id = req.params.id
    const dataBody = req.body
    console.log(dataBody);
    const pathData = path.join(__dirname, `../data/questions.json`)
    const dataQ = fs.readFileSync(pathData, "utf-8")
    const dataJsonQ = JSON.parse(dataQ)
    const checkId = dataJsonQ.findIndex(q => q.id == id)
    if (checkId !== -1) {
        dataJsonQ[checkId] = {
            ...dataJsonQ[checkId],
            content: dataBody.content !== undefined ? dataBody.content : dataJsonQ[checkId].content,
            like: dataBody.like !== undefined ? dataBody.like : dataJsonQ[checkId].like,
            dislike: dataBody.dislike !== undefined ? dataBody.dislike : dataJsonQ[checkId].dislike,
        };
        fs.writeFileSync(pathData, JSON.stringify(dataJsonQ));

        res.status(200).json({
            message: 'Update thành công',
        });
    } else {
        res.status(404).json({
            message: 'Không tìm thấy câu hỏi',
        });
    }
})
//B5
app.delete('/api/v1/questions/:id', authMiddleware, (req, res) => {
    const id = req.params.id
    const pathData = path.join(__dirname, `../data/questions.json`)
    const dataQ = fs.readFileSync(pathData, "utf-8")
    const dataJsonQ = JSON.parse(dataQ)
    const checkId= dataJsonQ.find(q => q.id == id)
    if (checkId) {
        const dataNotDelete = dataJsonQ.filter(q => q.id != id)
        fs.writeFileSync(pathData, JSON.stringify(dataNotDelete))
        res.status(200).json({
            message : "Xoa thanh cong"
        })
    } else {
        res.status(400).json({
            message : "Khong tim thay cau hoi"
        })}
})









app.get("*", ( req , res )=>{
    res.status(404).send("Page not found")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})