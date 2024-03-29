require("dotenv").config();

const express = require("express");
const app = express();
// const port = 8500; // http://localhost:8080
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const requestLogger = require("./middlewares/requestLogger")
const setCurrentUser = require("./middlewares/set_current_user");
const session = require("express-session");
const methodOverride = require("method-override");

const homeRouter = require("./routes/home_router");
const pinRouter = require("./routes/pin_router");
const sessionRouter = require("./routes/session_router");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET || "mistyrose",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(setCurrentUser);

app.use(homeRouter);
app.use(pinRouter);
app.use(sessionRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});