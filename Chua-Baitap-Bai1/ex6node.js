const http = require("node:http");
const fs = require("node:fs");
const url = require("node:url");
const PORT = 8801;

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    const data = fs.readFileSync("./dev-data/data.json", "utf-8");
    const dataOBJ = JSON.parse(data);

    if (pathname == "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(dataOBJ));
        res.end();
    } else if(pathname.split("/").length == 3){
        console.log({pathname});
        const id = pathname.split("/")[2];
        const dataByID = dataOBJ.find((dt) => dt.id == id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(dataByID));
        res.end();
    } 
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
