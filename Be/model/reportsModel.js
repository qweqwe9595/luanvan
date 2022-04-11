const mongoose = require("mongoose");
const reportsSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "usersModal" },
    reportMessage: { type: String },
    link: { type: String },
    isAction: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reportsModel", reportsSchema);
