const router = require("express").Router();
const { status } = require("express/lib/response");
const { findById } = require("../model/usersModel");
const userModal = require("../model/usersModel");
const {
  searchingUser,
  getAUser,
  getFriendRequestOfAUser,
  getAllUser,
  addFriend,
  acceptFriend,
  updateAUser,
  deleteAUser,
  unFriend,
} = require("../controller/usersController");

//searching user
router.get("/search", searchingUser);
//get a user
router.get("/getone/:id", getAUser);

//get friends request of a user
router.get("/requests/:id", getFriendRequestOfAUser);

//get all users
router.get("/", getAllUser);

//request add friend

router.patch("/add/:id", addFriend);

//accept friend
router.patch("/accept/:id", acceptFriend);

//update user
router.patch("/:id", updateAUser);

//unfriend
router.patch("/unfriend/:id", unFriend);

//delete user
router.delete("/:id", deleteAUser);

module.exports = router;
