const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
//     GET api/auth
//      Test route
//   Private Load a user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Access:public
//POST api/auth
// login a user

router.post(
  "/",
  [body("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if no errors then check password
    try {
      let user = await User.findOne({ email });
      //check first if email is correct
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //check now if password is correct
      let isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // now if everything is fine , return JWT

      const payload = {
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
      res.json({ msg: "Server error" });
    }
  }
);

module.exports = router;
