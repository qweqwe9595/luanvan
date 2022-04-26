const router = require("express").Router();
const authenticateToken = require("../middleWare/authJWT");
const {
  newUsers,
  newPosts,
  newEvents,
  newReports,
  newJobs,
  newDocs,
  onlineToday,
  approvedDocs,
  pendingDocs,
} = require("../controller/statisticController");

//newUser
router.get("/newUsers", newUsers);
router.get("/newPosts", newPosts);
router.get("/newEvents", newEvents);
router.get("/newReports", newReports);
router.get("/newJobs", newJobs);
router.get("/newDocs", newDocs);
router.get("/onlineToday", onlineToday);
router.get("/approvedDocs", approvedDocs);
router.get("/pendingDocs", pendingDocs);

module.exports = router;
