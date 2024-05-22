const PostModel = require("../../models/post-model");

const displayPosts = async (req, res) => {
  try {
    const locals = {
      title: "blog project",
      description: "simple blog created with nodeJs, expressJs && mongoDB",
    };

    let perPage = 5; // display 5 posts per page
    let page = req.query.page || 1;

    // sort the documents by their creation date in desc order (-1)
    // skip a certain number of documents
    // limits the number of documents returned from the aggregation to the value of perPage
    // executes the aggregation (return a promise)
    const data = await PostModel.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await PostModel.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    // const lastPage = page > 1 ? page - 1 : null; // *

    // index => ejs page
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      // lastPage: lastPage, // *
      currentRoute: "/", // /home
    }); // u can add multiple objects...
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
};

module.exports = { displayPosts };

// * get without the pagination thing

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
