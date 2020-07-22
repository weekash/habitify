const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HistorySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  checkedAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: "habits",
  },
  habitName: {
    type: String,
  },
});

const History = mongoose.model("History", HistorySchema);
module.exports = History;
