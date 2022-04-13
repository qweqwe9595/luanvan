const mongoose = require("mongoose");
const documentsSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "usersModal" },
    docName: { type: String },
    img: { type: String, default: "defaultEvent.jpg" },
    desc: { type: String },
    file: { type: String },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("documentsModel", documentsSchema);
