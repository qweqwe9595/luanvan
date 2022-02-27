const router = require("express").Router();
const userModal = require("../model/usersModel");

//create user
router.post("/register", async (req, res) => {
  try {
    const userQuery = await userModal.findOne({ email: req.body.email });

    if (!req.body.email.includes("ctu.edu.vn")) {
      return res.status(500).json("su dung email ctu");
    }

    if (userQuery) {
      return res.status(500).json("da ton tai email");
    }

    const newUser = await new userModal(req.body);
    await newUser.save();
    res.status(200).json({ message: "dang ki thanh cong", newUser });
  } catch (err) {
    res.status(500).json(err);
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
      return res
        .status(200)
        .json({ message: "dang nhap thanh cong", userQuery });
    } else {
      return res.status(200).json("sai tai khoan");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
