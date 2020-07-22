const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HabitSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  todayChecked: {
    type: Boolean,
    default: false,
  },
  pass: {
    type: Number,
    default: 0,
  },
  fail: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  reward: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  rewarded: {
    type: Boolean,
    default: false,
  },
});

const Habit = mongoose.model("Habit", HabitSchema);
module.exports = Habit;
