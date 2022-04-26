const router = require("express").Router();
const {
  createAConversation,
  getAllConversation,
  addANewUserToAConversation,
  pullAUserOutOfAConversation,
  getAConversation,
  deleteAConversation,
  updateOne,
} = require("../controller/conversationsController");
const authenticateToken = require("../middleWare/authJWT");
const authenticateTokenQuery = require("../middleWare/authJWTQuery");
//create 1
const multer = require("multer");

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//create 1
router.post(
  "/createOne",
  [authenticateToken, upload.single("conversationImg")],
  createAConversation
);
//get all
router.get("/getall", authenticateTokenQuery, getAllConversation);
//get all
router.get("/getone/:id", authenticateTokenQuery, getAConversation);
//update one
router.patch(
  "/updateone/:id",
  [authenticateToken, upload.single("conversationImg")],
  updateOne
);
//push a new user to conversation
router.patch("/push/:id", authenticateToken, addANewUserToAConversation);
//pull a new user to conversation
router.patch("/pull/:id", authenticateToken, pullAUserOutOfAConversation);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteAConversation);
module.exports = router;
