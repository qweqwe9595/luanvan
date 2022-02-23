const router = require("express").Router();
const postsModel = require("../model/postsModel");
const userModel = require("../model/usersModel");

//create a post
router.post("/", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(500).send("can it nhat mot so thong tin");
    }
    const newPost = new postsModel(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
    console.log(typeof res.json());
  } catch (err) {
    res.status(500).send(err);
  }
});
//get all post
router.get("/", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      return res.status(500).send("can id cua user dang dang nhap");
    }
    const currentUserQuery = await userModel.findOne({
      userId: req.body.userId,
    });
    const followings = await currentUserQuery.followings;
    const posts = await Promise.all(
      followings.map((id) => {
        return postsModel.find({ userId: id });
      })
    );
    res.status(200).json(posts[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await postsModel.findOne({ _id: req.params.id });
    res.status(500).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//update 1 post
router.patch("/:id", async (req, res) => {
  try {
    const post = await postsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
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
    res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
//comment a post
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
