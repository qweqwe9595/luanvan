const router = require("express").Router();
const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  getDocumentApproved,
  approved,
  unApproved,
  getDocumentPeding,
  getOneUser,
} = require("../controller/documentsController");

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

const authenticateToken = require("../middleWare/authJWT");
const authenticateTokenQuery = require("../middleWare/authJWTQuery");
//create 1
router.post(
  "/createOne",
  [authenticateToken, upload.array("docFile", 2)],
  createOne
);
//get all
router.get("/getall", authenticateTokenQuery, getAll);
//get one
router.get("/getone/:id", getOne);
//get one
router.get("/getuser", authenticateToken, getOneUser);
//get all of app docs

router.get("/getapproved", getDocumentApproved);

//get all of unapp docs
router.get("/getpending", getDocumentPeding);
//update one
router.patch(
  "/updateone/:id",
  [authenticateToken, upload.array("docFile", 2)],
  updateOne
);
//approved one
router.patch("/approveone/:id", authenticateToken, approved);
//unapproved one
router.patch("/unapproveone/:id", authenticateToken, unApproved);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteOne);
module.exports = router;
