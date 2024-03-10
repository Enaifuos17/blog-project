const express = require("express");
const routerBlog = express.Router();

routerBlog.get("/home", (req, res) => {
  const locals = {
    title: "blog project",
    description: "simple blog created with nodeJs, expressJs && mongoDB",
  };

  res.render("index", { locals }); // u can add multiple objects...
});

routerBlog.get("/about", (req, res) => {
  res.render("about");
});

module.exports = routerBlog;
