const router = require("express").Router();
const {
  getAllEvents,
  createAnEvent,
  deleteAnEvent,
  updateAnEvent,
} = require("../controller/eventsController");
const authenticateToken = require("../middleWare/authJWT");
//get all cmt
router.get("/all", getAllEvents);
//create an event
router.post("/createOne", authenticateToken, createAnEvent);
router.patch("/updateOne", authenticateToken, updateAnEvent);
router.delete("/deleteOne", authenticateToken, deleteAnEvent);

module.exports = router;
