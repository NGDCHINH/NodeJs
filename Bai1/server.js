const http = require("node:http");
const url = require("node:url");
const fs = require("node:fs");

const contentReadThis = fs.readFileSync('starter/txt/read-this.txt', 'utf8');
const contentInput = fs.readFileSync('starter/txt/input.txt', 'utf8');
const contentAppend = fs.readFileSync('starter/txt/append.txt', 'utf8');


const mergedContent = contentInput + contentAppend;

fs.writeFileSync('starter/txt/final.txt', mergedContent, 'utf8');

const server = http.createServer((req, res) => {
    console.log("Server is running");

    const { pathname } = url.parse(req.url, true);
    
    
    if (pathname == "/api/user") {
        res.writeHead(200, { "Content-type": "application/json" });

        const dataUser = [
            { name: "user1", email: "user1@gmail.com" },
            { name: "user2", email: "user2@gmail.com" },
            { name: "user3", email: "user3@gmail.com" },
        ];

        res.write(JSON.stringify(dataUser));
        res.end();
    } else {
        res.writeHead(200, { "Content-type": "application/json" });

        const responseData = {
            name: "Chinh", age: 23,
        };

        res.write(JSON.stringify(responseData));
        res.end();
    }
});

server.listen(8800, () => {
    console.log(`Server is running at http://localhost:8800`);
});
