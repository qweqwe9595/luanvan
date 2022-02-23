const router = require("express").Router();
const { status } = require("express/lib/response");
const userModal = require("../model/usersModel");

//create user
router.post("/register", async (req, res) => {
  try {
    const userQuery = await userModal.findOne({ email: req.body.email });

    if (!req.body.email.includes("@ctu.edu.vn")) {
      res.status(500).send("Sử dụng ctu email");
      return;
    }

    if (userQuery) {
      res.status(500).send("đã tồn tại");
    }

    const newUser = new userModal({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(200).send(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const userQuery = await userModal.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (userQuery) {
      res.status(200).send({ userQuery });
    } else {
      res.status(500).send("invalid");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
