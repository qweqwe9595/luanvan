const router = require("express").Router();
const {
  createOne,
  getAll,
  getOne,
  getReportUnAction,
  updateOne,
  approved,
  unApproved,
  deleteOne,
} = require("../controller/reportsController");

const authenticateToken = require("../middleWare/authJWT");
const authenticateTokenQuery = require("../middleWare/authJWTQuery");
//create 1
router.post("/createOne", authenticateToken, createOne);
//get all
router.get("/getall", authenticateTokenQuery, getAll);
//get one
router.get("/getone/:id", getOne);
//get all of conversation

router.get("/getunaction/:id", getReportUnAction);
//update one
router.patch("/updateone/:id", authenticateToken, updateOne);
//approved one
router.patch("/actionone/:id", authenticateToken, approved);
//unapproved one
router.patch("/unactionone/:id", authenticateToken, unApproved);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteOne);
module.exports = router;
