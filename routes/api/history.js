const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const History = require("../../models/history");
router.get("/", auth, async (req, res) => {
  try {
    const payload = await History.find({ user: req.user.id }).sort({
      checkedAt: "desc",
    });
    res.send(payload);
  } catch (err) {
    console.log(err);
    res.status(400).send({ errors: [{ msg: "Not found" }] });
  }
});

module.exports = router;
