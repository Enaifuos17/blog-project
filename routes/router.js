const express = require("express");
const PostModel = require("../models/post-model");
const routerBlog = express.Router();

routerBlog.get("/home", async (req, res) => {
  try {
    const locals = {
      title: "blog project",
      description: "simple blog created with nodeJs, expressJs && mongoDB",
    };

    let perPage = 5; // display 10 posts per page
    let page = req.query.page || 1;

    //
    const data = await PostModel.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await PostModel.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    }); // u can add multiple objects...
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
});

// routerBlog.get("/home", async (req, res) => {
//   const locals = {
//     title: "blog project",
//     description: "simple blog created with nodeJs, expressJs && mongoDB",
//   };

//   try {
//     const data = await PostModel.find(); // find all the posts
//     res.render("index", { locals, data }); // u can add multiple objects...
//   } catch (err) {
//     console.log(`Something wrong! ${err}`);
//   }
// });

// func - insertMany (CHECK)
// function insertPostData() {
//   PostModel.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries.",
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications.",
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js.",
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications.",
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations.",
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers.",
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic.",
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan.",
//     },
//   ]);
// }
// insertPostData();

routerBlog.get("/about", (req, res) => {
  res.render("about");
});

module.exports = routerBlog;
