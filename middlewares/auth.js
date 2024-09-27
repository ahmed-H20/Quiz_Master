const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (roles = []) => {
  return async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (!decoded) {
        return res.status(400).json({ error: "Invalid token, decoding failed." });
      }

      const userauth = await User.findOne({ _id: decoded.id });

      if (!userauth) {
        return res.status(401).json({ error: "User not found or token invalid." });
      }

      req.user = userauth;

      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ error: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token." });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired." });
      } else {
        return res.status(500).json({ error: "Internal server error." });
      }
    }
  };
};

module.exports = auth;


