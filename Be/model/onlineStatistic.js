const mongoose = require("mongoose");
const onlineStatisticsSchema = new mongoose.Schema(
  {
    amount: { type: Number },
    date: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("onlineStatistics", onlineStatisticsSchema);
