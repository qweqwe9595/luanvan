const router = require("express").Router();
const { status } = require("express/lib/response");
const { findById } = require("../model/usersModel");
const userModal = require("../model/usersModel");
const authenticateToken = require("../middleWare/authJWT");
const {
  newUsers,
  newPosts,
  newEvents,
  newReports,
  newJobs,
  newDocs,
  onlineToday,
} = require("../controller/statisticController");

//newUser
router.get("/newUsers", newUsers);
router.get("/newPosts", newPosts);
router.get("/newEvents", newEvents);
router.get("/newReports", newReports);
router.get("/newJobs", newJobs);
router.get("/newDocs", newDocs);
router.get("/onlineToday", onlineToday);

module.exports = router;
