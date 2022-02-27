const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: String },
  fromId: { type: String },
  message: { type: String, max: 300 },
  img: { type: String },
});

const postsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },

    groupId: {
      type: String,
      max: 300,
    },
    desc: {
      type: String,
      max: 350,
    },
    likes: {
      type: Array,
    },
    img: {
      type: String,
    },
    video: {
      type: String,
    },
    comments: [commentSchema],
    isJob: { type: Boolean, default: false },
    isDocument: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("postsModal", postsSchema);
