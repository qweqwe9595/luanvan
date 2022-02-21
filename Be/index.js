const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//components
const userRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");

require("dotenv").config();

mongoose.connect(process.env.connectString, { useNewUrlParser: true }, () => {
  console.log("connect to mongoDB");
});

app.use(express.json());
app.use("/api/auth", userRoute);
app.use("/api/users", usersRoute);

app.listen(5000, () => {
  console.log("running at local host 5000");
});
