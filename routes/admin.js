const express = require("express");
const PostModel = require("../models/post-model");
const routerAdmin = express.Router();

const adminLayout = "../views/layouts/admin.ejs";

/**
 *  @desc admin login page
 *  @route /admin
 *  @method GET
 *  @access public
 */

routerAdmin.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "admin",
      description: "simple blog created with nodeJs, expressJs && mongoDB",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
});

/**
 *  @desc admin check login
 *  @route /admin
 *  @method POST
 *  @access public
 */
routerAdmin.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // res.render("admin/index", { locals, layout: adminLayout });
    // just to understand the logic
    if (username === "admin" && password === "abcd") {
      res.send("WELCOOOOME!");
    } else {
      res.send("Wrong!!!");
    }
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
});

module.exports = routerAdmin;
