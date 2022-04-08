let onlineUsers = [];
const addNewUser = (userLogin, socketId) => {
  if (!userLogin._id) return;
  !onlineUsers.some((user) => user.userId === userLogin._id) &&
    onlineUsers.push({ ...userLogin, socketId });
};
const removeAuser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getAUser = (userId) => {
  return onlineUsers.find((user) => {
    return user._id == userId;
  });
};
const getAllUser = (userIdArray) => {
  return onlineUsers.filter((onlineUser) => {
    return userIdArray.some((item) => item === onlineUser._id);
  });
};

module.exports = { onlineUsers, addNewUser, removeAuser, getAUser, getAllUser };
