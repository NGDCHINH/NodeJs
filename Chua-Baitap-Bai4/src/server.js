const express = require("express");
const bodyParser = require("body-parser");
const rootRouter = require("./routers/index.router");
const cors = require("cors");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Router
rootRouter(app);

//Server
const POST = 8800;
app.listen(POST, () => {
  console.log(`Server is running on http://localhost:${POST}`);
});
