const postsModel = require("../model/postsModel");
const userModel = require("../model/usersModel");
const mongoose = require("mongoose");

//create a post
const createAPost = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(500).json({ message: "can user id" });
    }
    const newPost = new postsModel(req.body);
    if (req.file) {
      newPost.img = await req.file.filename;
    }
    const savePost = await newPost.save();
    await savePost.populate("userId");
    res.status(200).json({ message: "dang bai viet thanh cong", savePost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
//get timeline
const getTimeLine = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(500)
        .json({ message: "can id cua user can lay timeline" });
    }
    const currentUserQuery = await userModel.findOne({
      _id: req.params.id,
    });
    const followings = await currentUserQuery.followings;
    await followings.push(req.params.id);
    const posts = await Promise.all(
      followings.map((id) => {
        return postsModel
          .find({
            userId: id,
            $or: [{ scope: "public" }, { scope: "friends" }],
          })
          .populate("userId")
          .populate("likes");
      })
    );
    res.status(200).json({ message: "lay time line thanh cong", posts });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//get Share
const getMyShare = async (req, res) => {
  try {
    const usersQuery = await userModel
      .findById(req.user._id)
      .populate("sharePosts");
    const postQuery = usersQuery.sharePosts;
    res.status(200).json({ message: "lay time line thanh cong", postQuery });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//get all post
const getAllPost = async (req, res) => {
  try {
    const postQuery = await postsModel
      .find()
      .populate("userId")
      .populate("likes");
    res.status(200).json(postQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//get a profile posts
const getAProfilePosts = async (req, res) => {
  const amount = req.query.amount;
  try {
    let postQuery = [];
    if (req.user._id == req.params.id) {
      postQuery = await postsModel
        .find({ userId: req.params.id })
        .populate("userId")
        .populate("likes");
    } else {
      postQuery = await postsModel
        .find({
          userId: req.params.id,
          $or: [{ scope: "public" }, { scope: "friends" }],
        })
        .populate("userId")
        .populate("likes");
    }

    if (!postQuery || postQuery.length === 0) {
      return res
        .status(500)
        .json({ message: "no User found or no posts found" });
    }
    const postQueryFilter = amount
      ? postQuery.filter((post, index) => index < amount)
      : postQuery;
    res.status(200).json({ message: "thanh cong ", posts: postQueryFilter });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//get a post
const getAPost = async (req, res) => {
  try {
    const post = await postsModel
      .findById(req.params.id)
      .populate("userId")
      .populate("likes");
    res.status(200).json({ message: "thanh cong", post });
  } catch (err) {
    res.status(500).json(err);
  }
};

//update 1 post (chinh sua)
const updateAPost = async (req, res) => {
  try {
    console.log(req.file);
    const post = await postsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    const postQuery = await postsModel.findById(req.params.id);
    if (req.file) {
      postQuery.img = await req.file.filename;
    }
    await postQuery.save();
    res.status(200).json(postQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//share a post (chinh sua)
const shareAPost = async (req, res) => {
  try {
    const post = await postsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { share: req.user._id } },
      { new: true }
    );
    if (req.user._id !== post.userId) {
      const userShare = await userModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { sharePosts: post._id },
      });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//unshare a post (chinh sua)
const unShareAPost = async (req, res) => {
  try {
    const post = await postsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { share: req.user._id } },
      { new: true }
    );
    if (req.user._id !== post.userId) {
      const userShare = await userModel.findByIdAndUpdate(req.user._id, {
        $pull: { sharePosts: post._id },
      });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//delete a post
const deleteAPost = async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    const user = await userModel.findById(req.body.userId);

    if (!req.body.userId) {
      return res.status(400).json({ message: "need userId in body" });
    }
    if (!user) return res.status(500).json({ message: "khong tim thay user" });
    if (req.body.userId == post.userId || user.isAdmin) {
      await post.deleteOne();
      res.status(200).json({ message: "delete thanh cong" });
    } else {
      res.status(500).json({ message: "chi có thể delete bài post của bạn" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//like a post
const likeAPost = async (req, res) => {
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
    res.status(500).send(err);
  }
};

module.exports = {
  createAPost,
  getTimeLine,
  getAllPost,
  getAProfilePosts,
  getAPost,
  updateAPost,
  deleteAPost,
  likeAPost,
  shareAPost,
  unShareAPost,
  getMyShare,
};
