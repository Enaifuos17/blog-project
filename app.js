// dotenv config
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const routerBlog = require("./routes/router");
const connectDB = require("./config/db");
const routerAdmin = require("./routes/admin");

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

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
app.use(routerBlog);
app.use(routerAdmin);

// run the server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
