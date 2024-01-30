const http = require("node:http");
const fs = require("node:fs");
const url = require("node:url");
const PORT = 8802;

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    const overviewHTML = fs.readFileSync("./templates/overview.html", "utf-8");
    const productHTML = fs.readFileSync("./templates/product.html", "utf-8");
    const searchHTML = fs.readFileSync("./templates/search.html", "utf-8");
    const createHTML = fs.readFileSync("./templates/create.html", "utf-8");

    if (pathname == "/" || pathname == "/overview") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(overviewHTML);
    } else if (pathname == "/product") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(productHTML);
    }else if (pathname == "/search") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(productHTML);
    }
    else if (pathname == "/create") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(productHTML);
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page không tồn tại");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});