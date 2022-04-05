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
  return onlineUsers.map((onlineUser) => userIdArray.every(onlineUser._id));
};

module.exports = { onlineUsers, addNewUser, removeAuser, getAUser };
