const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//components
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");

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
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

app.listen(5000, () => {
  console.log("running at local host 5000");
});

