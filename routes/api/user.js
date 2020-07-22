const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const User = require("../../models/user");
const auth = require("../../middleware/auth");
const Habit = require("../../models/habit");
const History = require("../../models/history");

// Access:public
//get api/user/:id
// get user by id

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }, { name: 1 });

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error" });
  }
});

// Access:public
//POST api/user/
// register a user

router.post(
  "/",
  [
    body("name", "Please write your name").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please type a strong password with min 8 chars."
    ).isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //see if user exists
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password, salt);
      user = new User({ name, email, password: encryptedPassword });
      await user.save();
      // get jwt
      let payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            console.log(error);
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

router.post("/addreward", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $inc: { reward: req.body.reward } }
    );
    const saved = await Habit.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { rewarded: true } }
    );

    let history = await History({
      message: `You received  ${req.body.reward} credits for completing ${saved.name} `,
      user: req.user.id,
      habit: saved.id,
      habitName: saved.name,
    });
    await history.save();
    res.send({ msg: "added to account" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "server error" });
  }
});

module.exports = router;
