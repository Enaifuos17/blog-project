const express = require("express");
const PostModel = require("../models/post-model");
const UserModel = require("../models/user-model");
const routerAdmin = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin.ejs";

const jwtSecret = process.env.JWT_SECRET;

/**
 *  @desc check login
 */
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // get the token from the cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized 1111!" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized 2222!" });
  }
};

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
// routerAdmin.post("/admin", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // console.log(username, password);
//     // res.render("admin/index", { locals, layout: adminLayout });
//     // res.redirect("/admin");
//     // just to understand the logic
//     if (username === "admin" && password === "abcd") {
//       res.send("WELCOOOOME!");
//     } else {
//       res.send("Wrong!!!");
//     }
//   } catch (err) {
//     console.log(`Something wrong! ${err}`);
//   }
// });

/**
 *  @desc admin check login
 *  @route /admin
 *  @method POST
 *  @access public
 */
routerAdmin.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "INVALIIIIID PWD!" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
});

/**
 *  @desc admin dashboard
 *  @route /dashboard
 *  @method GET
 *  @access public
 */
routerAdmin.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "dashboard",
      description: "simple blog created with nodeJs, expressJs && mongoDB",
    };

    const data = await PostModel.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (err) {
    console.log(`Something wrong!!! ${err}`);
  }
});

/**
 *  @desc admin - create new post
 *  @route /add-post
 *  @method GET
 *  @access public
 */

routerAdmin.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "simple blog created with nodeJs, expressJs && mongoDB",
    };

    res.render("admin/add-post", {
      locals,
      layout: adminLayout,
    });
  } catch (err) {
    console.log(`Something wrong!!! ${err}`);
  }
});

/**
 *  @desc admin - create new post
 *  @route /add-post
 *  @method POST
 *  @access public
 */

routerAdmin.post("/add-post", authMiddleware, async (req, res) => {
  try {
    // console.log(req.body);
    try {
      const newPost = new PostModel({
        title: req.body.title,
        body: req.body.body,
      });
      await PostModel.create(newPost); // create a new post
      res.redirect("/dashboard");
    } catch (err) {
      console.log(`err here :( ${err}`);
    }
  } catch (err) {
    console.log(`Something wrong!!! ${err}`);
  }
});

/**
 *  @desc admin - register
 *  @route /register
 *  @method POST
 *  @access public
 */
routerAdmin.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await UserModel.create({
        username,
        password: hashedPassword, // pass the hashed password
      });
      res.status(201).json({ message: "User created successfully!" }, user); // for testing purpose
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ message: "Username already exists!" });
      }
      res.status(500).json({ message: "Something went wrong 111!" });
    }
  } catch (err) {
    console.log(`Something wrong 222! ${err}`);
  }
});

module.exports = routerAdmin;
