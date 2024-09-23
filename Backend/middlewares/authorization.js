require("dotenv").config();
const JWT = require("jsonwebtoken");

// Admin Middleware
const admin = (req, res, next) => {
  const token = req.header("x-auth-token");
    console.log(token);
  try {
    const varified = JWT.verify(token, process.env.JWT_ADMIN_SECRET);
    console.log(varified);
    if (!varified) {
      return res.status(401).send("Request is not authorized");
    }
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
module.exports = admin;
