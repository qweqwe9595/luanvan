const router = require("express").Router();
const {
  getAllEvents,
  createAnEvent,
  deleteAnEvent,
  updateAnEvent,
  getAnEvents,
  joinEvent,
} = require("../controller/eventsController");

router.get("/badwords", getAllEvents);
router.post("/getOne/:id", getAnEvents);
//create an event
router.post(
  "/createOne",
  [authenticateToken, upload.single("eventImg")],
  createAnEvent
);
router.post("/join", authenticateToken, joinEvent);
router.patch(
  "/updateOne",
  [authenticateToken, upload.single("eventImg")],
  updateAnEvent
);
router.delete("/deleteOne", authenticateToken, deleteAnEvent);

module.exports = router;
