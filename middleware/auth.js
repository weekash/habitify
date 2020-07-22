const jwt = require("jsonwebtoken");

//next is a callback
module.exports = function (req, res, next) {
  //get token from header
  const token = req.headers["x-auth-token"];
  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "NO token , authorization denied" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
