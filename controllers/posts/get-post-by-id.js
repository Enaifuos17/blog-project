const PostModel = require("../../models/post-model");

const getPostByID = async (req, res) => {
  try {
    let postID = req.params.id;
    const data = await PostModel.findById({ _id: postID });
    const locals = {
      title: data.title,
      description: data.body,
    };
    res.render("post", { locals, data });
  } catch {
    console.log(`Something wrong! ${err}`);
  }
};

module.exports = { getPostByID };
