const postsModel = require("../model/postsModel");
const commentLv1Model = require("../model/commenLv1Model");
const mongoose = require("mongoose");
const commentLv2Model = require("../model/commentLv2Model");

const commentLv1 = async (req, res) => {
  try {
    const postQuery = await postsModel.findOne({
      _id: mongoose.Types.ObjectId(req.body.postId),
    });
    if (!postQuery)
      return res.status(400).json({ message: "khong tim thay bai post" });
    const commentQuery = await new commentLv1Model(req.body);
    await commentQuery.save();
    res.status(200).json({ commentQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const commentLv2 = async (req, res) => {
  try {
    const commentLv2Query = await new commentLv2Model(req.body);
    const commentLv1Update = await commentLv1Model
      .findByIdAndUpdate(
        req.body.commentLv1,
        { $push: { commentLv2: commentLv2Query._id } },
        { new: true }
      )
      .populate("commentLv2");
    await commentLv2Query.save();
    res
      .status(200)
      .json({ message: "thanh cong", commentLv2Query, commentLv1Update });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updatecommentLv1 = async (req, res) => {
  try {
    const updateQuery = await commentLv1Model.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ updateQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updatecommentLv2 = async (req, res) => {
  try {
    const updateQuery = await commentLv2Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ updateQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getAllComment = async (req, res) => {
  try {
    const commentsQuery = await commentLv1Model.find();
    res.status(200).json({ message: "thanh cong", commentsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllCommentOfAPost = async (req, res) => {
  try {
    const commentsQuery = await commentLv1Model
      .find({ postId: req.params.id })
      .populate("commentLv2");
    res.status(200).json({ message: "thanh cong", data: commentsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteCommentLv1 = async (req, res) => {
  try {
    const deleteQuery = await commentLv1Model.findByIdAndDelete(req.params.id);
    if (!deleteQuery)
      return res.status(403).json({ message: "khong tim thay cmt" });
    res.status(200).json({ message: "delete thanh cong", deleteQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteCommentLv2 = async (req, res) => {
  try {
    const deleteLv2Query = await commentLv2Model.findByIdAndDelete(
      req.params.id
    );
    if (!deleteLv2Query)
      return res.status(403).json({ message: "khong tim thay cmt" });
    res.status(200).json({ message: "delete thanh cong" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  commentLv1,
  commentLv2,
  getAllComment,
  updatecommentLv1,
  getAllCommentOfAPost,
  updatecommentLv2,
  deleteCommentLv1,
  deleteCommentLv2,
};
