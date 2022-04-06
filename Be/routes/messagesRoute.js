const router = require("express").Router();
const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  getMessageConversation,
} = require("../controller/messagesController");
const authenticateToken = require("../middleWare/authJWT");
//create 1
router.post("/createOne", authenticateToken, createOne);
//get all
router.get("/getall", authenticateToken, getAll);
//get one
router.get("/getone/:id", authenticateToken, getOne);
//get all of conversation
router.get(
  "/getfromcoversation/:id",
  authenticateToken,
  getMessageConversation
);
//update one
router.patch("/updateone/:id", authenticateToken, updateOne);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteOne);
module.exports = router;
