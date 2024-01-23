require("dotenv").config();

const express = require("express");
const app = express();
const port = 8000; // http://localhost:8080
const expressLayouts = require("express-ejs-layouts");
const homeRouter = require("./routes/home_router");
const pinRouter = require("./routes/pin_router");
const sessionRouter = require("./routes/session_router");
const requestLogger = require("./middlewares/requestLogger")

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(homeRouter);
app.use(pinRouter);
app.use(sessionRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
