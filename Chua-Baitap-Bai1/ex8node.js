const http = require("node:http");
const url = require("node:url");
const fs = require("node:fs");

const server = http.createServer((request, response) => {
  console.log("request ==>", request.url);
  const { pathname } = url.parse(request.url, true);

  //phần đọc cái file json
  const dataJson = fs.readFileSync("./dev-data/data.json", "utf-8");
  const dataObject = JSON.parse(dataJson);
  if (pathname === "/" || pathname === "/overview") {
    //phần đọc html
    const cartTemplate = fs.readFileSync(
      "./templates/card_template.html",
      "utf8"
    );
    const overview = fs.readFileSync("./templates/overview.html", "utf8");
    //bien doi
    const replaceData = dataObject.map((product) => {
      return cartTemplate
        .replaceAll("{{image}}", product.image)
        .replace("{{productName}}", product.productName)
        .replace("{{price}}", product.price)
        .replace("{{quantity}}", product.quantity)
        .replace("{{ id }}", product.id);
    });
    console.log("replaceData", replaceData);
    const renderOverView = overview.replace("{{ listProduct }}", replaceData);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    response.write(renderOverView);
  } else {
    const pathUrl = pathname.split("/");
    const id = pathUrl[pathUrl.length - 1];
    console.log("id", id);
    const productDetail = dataObject.find((product) => +product.id == +id);

    const product = fs.readFileSync("./templates/product.html", "utf8");
    const productReplace = product
      .replace("{{productName}}", productDetail.productName)
      .replace("{{from}}", productDetail.from)
      .replace("{{nutrients}}", productDetail.nutrients)
      .replace("{{quantity}}", productDetail.quantity)
      .replace("{{price}}", productDetail.price)
      .replace("{{description}}", productDetail.description);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    response.write(productReplace);
  }
  response.end();
});

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});