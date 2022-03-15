const userModal = require("../model/usersModel");

const searchingUser = async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(500).json({ message: "need a valid query name" });
    }
    if (req.query.limit) {
      const userQuery = await userModal
        .find({
          userName: {
            $regex: ".*" + req.query.name.toLocaleLowerCase() + ".*",
          },
        })
        .limit(req.query.limit);
      return res.status(200).json({ message: "thanh cong", data: userQuery });
    }
    const userQuery = await userModal.find({
      userName: { $regex: ".*" + req.query.name + ".*" },
    });

    res.status(200).json({ message: "thanh cong", data: userQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAUser = async (req, res) => {
  try {
    const userQuery = await userModal.findById(req.params.id);
    const { isAdmin, updatedAt, ...other } = userQuery._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getFriendRequestOfAUser = async (req, res) => {
  try {
    const userQuery = await userModal.findById(req.params.id);
    const friendsRequestIdArray = await userQuery.friendsRequest;
    const friendsRequestPromises = friendsRequestIdArray.map(async (id) => {
      return await userModal.findById(id);
    });
    await Promise.all(friendsRequestPromises).then((value) => {
      res.status(200).json({ message: "thanh cong", results: value });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const userQuery = await userModal.find();
    res.status(200).json(userQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addFriend = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const receiverQuery = await userModal.findById(req.params.id);
      const friendsRequestOfReceiver = receiverQuery.friendsRequest;
      if (friendsRequestOfReceiver.includes(req.body.userId))
        return res
          .status(500)
          .json({ message: "da gui yeu cau khong can gui lai" });
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
};

const acceptFriend = async (req, res) => {
  try {
    const userAddQuery = await userModal.findById({ _id: req.body.userId });
    const userAcceptQuery = await userModal.findById({ _id: req.params.id });
    const userAcceptId = userAcceptQuery._doc._id;
    console.log(userAddQuery._doc.friends, userAcceptId);
    if (userAddQuery._doc.friends.includes(userAcceptId)) {
      res.status(500).send("already friend");
    } else {
      const newFriendRequest = userAcceptQuery.friendsRequest.filter(
        (e) => e != req.body.userId
      );
      const userAcceptUpdateQuery = await userModal.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $push: {
            friends: req.params.id,
            followings: req.params.id,
          },
          $set: {
            friendsRequest: newFriendRequest,
          },
        }
      );
      const userAddUpdateQuery = await userModal.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.body.userId, followers: req.body.userId } }
      );
      await userAddUpdateQuery.save();
      await userAcceptUpdateQuery.save();
      res.status(200).send({ userAddUpdateQuery, userAcceptUpdateQuery });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
};

const updateAUser = async (req, res) => {
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
};

const deleteAUser = async (req, res) => {
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
};

module.exports = {
  searchingUser,
  getAUser,
  getFriendRequestOfAUser,
  getAllUser,
  addFriend,
  acceptFriend,
  updateAUser,
  deleteAUser,
};
