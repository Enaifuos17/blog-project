// dotenv config
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const routerBlog = require("./routes/router");
const connectDB = require("./config/db");
const routerAdmin = require("./routes/admin");

const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const { isActiveRoute } = require("./helpers/routeHelpers");

const app = express();
const PORT = process.env.PORT;

// middleware to serve static files from "public" directory
app.use(express.static("public"));

// middlwr - template engine
app.use(expressLayout); // middleware to let express app use expressLayout
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// connect DB
connectDB();

// global variables
app.locals.isActiveRoute = isActiveRoute;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // cookie parser
app.use(methodOverride("_method")); // method override

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: new Date(Date.now() + (3600000) ) },
  })
);

// route
app.use(routerBlog);
app.use(routerAdmin);

// run the server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
