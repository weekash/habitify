const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Habit = require("../../models/habit");
const History = require("../../models/history");
//access private
//desc : Get all habits
//route GET /api/habit

router.get("/", auth, async (req, res) => {
  try {
    let habits = await Habit.find({ user: req.user.id }).sort({
      dateCreated: "desc",
    });
    res.send(habits);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
});

//access private
//desc : Get ubchecked habits
//route GET /api/habit/unchecked

router.get("/unchecked", auth, async (req, res) => {
  try {
    let habits = await Habit.find({
      user: req.user.id,
      todayChecked: false,
    }).sort({
      dateCreated: "desc",
    });
    res.send(habits);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
});

//access public
//desc : Get habit by id
//route GET /api/habit/:id

router.get("/:id", async (req, res) => {
  try {
    let habit = await Habit.find({
      _id: req.params.id,
      isCompleted: true,
      rewarded: true,
    });
    if (!habit.length) {
      res.status(404).send({ errors: [{ msg: "Not found" }] });
    }
    res.send(habit[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
});

//access private
//desc: Adding a habit
// route : POST  /api/habit/add

router.post(
  "/add",
  auth,
  [
    check("name", "Please enter your habit").notEmpty(),
    check("duration", "duration should be between 14 and 28").isInt({
      min: 14,
      max: 28,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    const { name, duration } = req.body;
    if (!errors.isEmpty()) {
      console.log("here");
      return res.status(400).json({ errors: errors.array() });
    }
    let ar = [20, 10, 40, 100, 30, 10, 10, 20, 10, 10, 50, 10, 10, 20];
    let i = Math.floor(Math.random() * 13);

    try {
      let habits = await Habit.find({
        isCompleted: false,
        user: req.user.id,
      });
      if (habits.length > 5) {
        return res.status(400).json({
          errors: [
            {
              msg: "You already have 5 incomplete habits. Complete them first.",
            },
          ],
        });
      }
      let habit = await Habit.findOne({
        name,
        isCompleted: false,
        user: req.user.id,
      });
      if (habit) {
        return res
          .status(400)
          .json({ errors: [{ msg: "habit already exists" }] });
      }

      habit = new Habit({ name, duration, user: req.user.id, reward: ar[i] });
      const saved = await habit.save();

      let history = new History({
        message: `You added a new habit ${saved.name}`,
        user: req.user.id,
        habit: saved.id,
        habitName: saved.name,
      });
      await history.save();
      res.status(200).json({ msg: "Habit saved" });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

//access private
//desc: save today progress to a habit
// route : POST  /api/habit/check/:id

router.post(
  "/check/:id",
  auth,
  [check("message", "Please enter a message").notEmpty()],
  async (req, res) => {
    const { message } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let habit = await Habit.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

      if (!habit) {
        return res
          .status(400)
          .json({ errors: [{ msg: "habit doesn't exists" }] });
      }
      if (!habit.todayChecked && !habit.isCompleted) {
        await habit.updateOne({
          todayChecked: true,
          message: message,
          pass: habit.pass + 1,
          isCompleted: habit.pass + 1 == habit.duration ? true : false,
          lastUpdated: Date.now(),
        });

        let history = new History({
          message,
          user: req.user.id,
          habit: habit.id,
          habitName: habit.name,
        });
        await history.save();

        return res.status(200).json({ msg: "Checked habit for today" });
      }
      return res.status(400).json({ msg: "Already checked habit for today" });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id });

    if (!habit) {
      res.status(404).send({ errors: [{ msg: "Habit doesn't exist" }] });
    }
    const id = habit._id;
    await History.deleteMany({ habit: id });
    await habit.deleteOne();
    res.send({ msg: "Habit deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Server Error" });
  }
});
module.exports = router;
