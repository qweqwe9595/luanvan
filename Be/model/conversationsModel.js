const mongoose = require("mongoose");
const conversationsSchema = new mongoose.Schema(
  {
    members: [{ type: String, ref: "usersModal" }],
    admin: { type: String, ref: "usersModal" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversationModel", conversationsSchema);
