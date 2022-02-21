const router = require("express").Router();
const { status } = require("express/lib/response");
const { findById } = require("../model/usersModel");
const userModal = require("../model/usersModel");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const userQuery = await userModal.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(userQuery);
    } catch (err) {
      res.status(403).send(err);
    }
  } else {
    res.status(500).send("khong the update user khac");
  }
});

//delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      const userQuery = await userModal.deleteOne({
        _id: req.params.id,
      });
      res.status(200).send("been deleted");
    } catch (err) {
      res.status(403).send(err);
    }
  } else {
    return res.status(403).json("U can delete only ur account");
  }
});

//get a user

router.get("/:id", async (req, res) => {
  try {
    const userQuery = await userModal.findById(req.params.id);
    const { isAdmin, updatedAt, ...other } = userQuery._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(403).send(err);
  }
});

//request add friend

router.put("/add/:id", async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const userfollowingQuery = await userModal.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            friendsRequest: req.body.userId,
            followers: req.body.userId,
          },
        },
        { new: true }
      );
      const userfollowerQuery = await userModal.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $push: { followings: req.params.id },
        },
        { new: true }
      );
      await userfollowingQuery.save();

      await userfollowerQuery.save();
      res.status(200).json("da gui yeu cau ket ban");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(500).send("can't add friend ur self");
  }
});

//accept friend
router.put("/accept/:id", async (req, res) => {
  try {
    const userAddQuery = await userModal.findById({ _id: req.body.userId });
    const userAcceptQuery = await userModal.findById({ _id: req.params.id });
    const userAcceptId = userAcceptQuery._doc._id;

    if (userAddQuery._doc.friends.includes(userAcceptId)) {
      res.status(500).send("already friend");
    } else {
      const userAcceptUpdateQuery = await userModal.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { friends: req.body.userId, followings: req.body.userId } }
      );
      const userAddUpdateQuery = await userModal.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.params.id, followers: req.params.id } }
      );
      await userAddUpdateQuery.save();
      await userAcceptUpdateQuery.save();
      res.status(200).send({ userAddUpdateQuery, userAcceptUpdateQuery });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

module.exports = router;
