const http = require("node:http")
const url = require("node:url")
const queryString = require("querystring")



const server = http.createServer((req, res)=>{
    const {pathname, query} = url.parse(req.url, true)
    console.log("pathname", pathname);
    console.log("query", query);
    if (req.method == "GET" && pathname == "/") {
        res.writeHead(200,{"Content-type":"application/json ; charset=utf-8"})
        res.write(JSON.stringify({
            product:[
                {
                    name: "Áo ba lỗ",
                    price: 200,
                },
                {
                    name: "Quần đùi",
                    price: 120,
                }
            ]
        }))
        res.end() 
    } else if(req.method == "POST" && pathname == "/signup"){
        // request.on để lẫy ra data từ client dành cho nodejs
        let data =""
        req.on("error", (error)=>{
            console.log("Lỗi m* m** rồi",error);
        })
        req.on("data", (chuck)=>{
            data += chuck.toString()
        })
        req.on("end", ()=>{
            
            // Hai cách xử lý dùng thư viện querýtring = npm i query-string or dùng js loop để biến đổi về obj
            const dataUser = queryString.parse(data)
            console.log(dataUser);
            const {Username , Email , ... rest} = dataUser
            res.writeHead(200,{"Content-type":"application/json ; charset=utf-8"})
            res.write(JSON.stringify({
                message: "tạo thành công",
                user:[
                {
                    username: Username,
                    email: Email,
                },
            ]
        }))
            res.end()
        })
    }
    
})

const PORT = 8800

server.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})