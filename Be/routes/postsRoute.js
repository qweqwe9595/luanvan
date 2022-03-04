const router = require("express").Router();
const postsModel = require("../model/postsModel");
const userModel = require("../model/usersModel");

//create a post
router.post("/", async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(500).json({ message: "can user id" });
    }
    const newPost = new postsModel(req.body);
    const savePost = await newPost.save();
    res.status(200).json({ message: "dang bai viet thanh cong", newPost });
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//get timeline
router.get("/timeline/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(500)
        .json({ message: "can id cua user can lay timeline" });
    }
    const currentUserQuery = await userModel.findOne({
      userId: req.params.id,
    });
    const followings = await currentUserQuery.followings;
    await followings.push(req.params.id);
    const posts = await Promise.all(
      followings.map((id) => {
        return postsModel.find({ userId: id });
      })
    );
    res.status(200).json({ message: "lay time line thanh cong", posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post
router.get("/admin", async (req, res) => {
  try {
    const postQuery = await postsModel.find();
    res.status(200).json(postQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await postsModel.findOne({ _id: req.params.id });
    res.status(200).json({ message: "thanh cong", post });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update 1 post (chinh sua)
router.patch("/:id", async (req, res) => {
  try {
    const post = await postsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    const user = await userModel.findById(req.body.userId);
    if (!req.body.userId) {
      return res.status(500).send("login");
    }
    if (req.body.userId == post.userId || user.isAdmin) {
      await post.deleteOne();
      res.status(200).send("delete thanh cong");
    } else {
      res.status(500).send("ko thanh cong");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//like a post
router.post("/like/:id", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (!req.body.userId) {
      res.status(500).send("login");
    }

    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
    }
    // res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
//create comment a post
router.put("/comment/:id", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    console.log(req.body);
    if (!req.body.userId || !req.body) {
      res.status(500).send("need info");
    }
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
