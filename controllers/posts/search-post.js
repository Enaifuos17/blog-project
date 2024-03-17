const PostModel = require("../../models/post-model");

const searchPost = async (req, res) => {
  try {
    const locals = {
      title: "search",
      description: "simple blog created with nodeJs, expressJs && mongoDB",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, ""); // search for special char

    const data = await PostModel.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { locals, data });
    // res.send(searchNoSpecialChar);
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
};

module.exports = { searchPost };
