const connection = require('../configs/config.mysql')

const getAllUsers = (req, res) => {
    connection.query("SELECT * FROM users", (error, result)=>{
        if(error){
            throw new Error(error)
            }
            res.status(200).json(result)
    })
}
const getUserById = (req, res) => {
    const { id } = req.params
    connection.query("SELECT * FROM users WHERE user_id = ?", id , (error, result)=>{
        if(error){
            console.log("loi me m roi", error);
            res.status(400).json({
                message: "lay thong tin that bai",
            })
        }
        console.log(result);
        res.status(200).json({
            message: "lay thong tin thanh cong",
            data: result,
        }
        
        )
    })
}

const updateUser = (req, res) => {
    const { user_name, email, pass_word } = req.body
    connection.query("INSERT INTO users (user_name, email, pass_word) VALUES (?,?,?)", [user_name, email, pass_word], (error, result)=>{
        if (error) {
            console.log("loi me m roi", error);
            res.status(400).json({
                message: "lay thong tin that bai",
            })
        }
        res.status(200).json({
            message: "tao moi thanh cong"
        })
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
}