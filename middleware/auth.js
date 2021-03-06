const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, cb) => {
  //Get token from header

  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, user not authorized" });
  }

  // Verify token

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    cb();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
