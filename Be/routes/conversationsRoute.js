const router = require("express").Router();
const {
  createAConversation,
  getAllConversation,
  addANewUserToAConversation,
  pullAUserOutOfAConversation,
  getAConversation,
  deleteAConversation,
} = require("../controller/conversationsController");
const authenticateToken = require("../middleWare/authJWT");
//create 1
router.post("/createOne", authenticateToken, createAConversation);
//get all
router.get("/getall", authenticateToken, getAllConversation);
//get all
router.get("/getone/:id", authenticateToken, getAConversation);
//push a new user to conversation
router.patch("/push/:id", authenticateToken, addANewUserToAConversation);
//pull a new user to conversation
router.patch("/pull/:id", authenticateToken, pullAUserOutOfAConversation);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteAConversation);
module.exports = router;
