const express = require("express");
const bodyParser = require("body-parser");
const root = require("./routes/rootRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//
const app = express();
//
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//
root(app);
//
const PORT = 8800;
app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
