const mongoose = require("mongoose");

const forbiddensSchema = new mongoose.Schema(
  {
    badwords:[{type:String}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("forbiddensModel", forbiddensSchema);
// module.exports = mongoose.model("commentModal", commentSchema);
