const http = require("node:http")
const url = require("node:url")
const PORT = 8800

const server = http.createServer((req, res)=>{
    
    const {pathname} = url.parse(req.url, true)
    {
        if (pathname == "/"){
            res.writeHead(200, {"Content-type":"text/html ; charset=utf-8"})
            res.write(`<h1 style="color:red">This is Home Page</h1>`)
            res.end()
        } else if (pathname == "/overview"){
            res.writeHead(200, {"Content-type":"text/html ; charset=utf-8"})
            res.write(`<h1 style="color:blue">Đây là Overview Page</h1>`)
            res.end()
        } else if (pathname == "/product"){
            res.writeHead(200, {"Content-type":"text/html ; charset=utf-8"})
            res.write(`<h1 style="color:green">This is Product Page</h1>`)
            res.end()
        } else {
            res.writeHead(404, {"Content-type":"text/html ; charset=utf-8"})
            res.write("Lỗi không tìm thấy page")
            res.end() 
        }
    
    } 
    // res.writeHead(200, {"Content-type":"text/plain ; charset=utf-8"})
    // res.write("Chữa bài tập ss1 nodejs")
    // res.end();
});
server.listen(PORT,() => {
    console.log(`Server is running at port http://localhost:${PORT}`);
});