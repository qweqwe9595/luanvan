const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    MSSV: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    coverPictrue: {
      type: String,
    },
    pictures: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    friendsRequest: {
      type: Array,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      city: { type: String },
      distrist: { type: String },
    },
    sex: {
      type: Boolean,
    },
    dateOfBirth: {
      type: Date,
    },
    about: {
      type: String,
      default: "",
    },
    major: {
      class: { type: String },
      majorName: { type: String },
      yearKey: { type: Number },
    },
    saveEvents: {
      type: Array,
    },
    saveDocs: {
      type: Array,
    },
    savePosts: {
      type: Array,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    idAdminBlock: {
      type: Boolean,
      default: false,
    },
    blockDuration: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usersModal", userSchema);
