const express = require("express");
var app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const userModal = require("./model/usersModel");
const {
  onlineUsers,
  addNewUser,
  removeAuser,
  getAUser,
} = require("./socket/socketHelper");

//socket
//online users
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("userDisconnect", () => {
    removeAuser(socket.id);
  });
  socket.on("userConnection", (user) => {
    addNewUser(user, socket.id);
  });
  socket.on("sendNotification", ({ receiverUserId, type }) => {
    const receiver = getAUser(receiverUserId);

    // if (receiver.socketID === socket.id) return;
    if (!receiver) return;
    io.to(receiver.socketId).emit("getNotification", receiver.notifications);
  });
});

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

//routes
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");
const commentsRoute = require("./routes/commentsRoute");
const eventsRoute = require("./routes/eventsRoute");

require("dotenv").config();

mongoose.connect(process.env.connectString, { useNewUrlParser: true }, () => {
  console.log("connect to mongoDB");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/images", express.static("images"));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/events", eventsRoute);

http.listen(5000, () => {
  console.log("running at local host 5000");
});
