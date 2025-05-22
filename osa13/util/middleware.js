const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { User, Session } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const decoded = jwt.verify(token, SECRET);

      const session = await Session.findOne({ where: { token } });
      if (!session) {
        return res.status(401).json({ error: "session invalid or expired" });
      }

      const user = await User.findByPk(decoded.id);
      if (!user || user.disabled) {
        return res
          .status(401)
          .json({ error: "user disabled or does not exist" });
      }

      req.decodedToken = decoded;
      req.user = user;
      req.token = token;
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const uknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.message === "Validation isEmail on username failed") {
    return res.status(400).json({ error: "username must be an email" });
  }
  next(error);
};

module.exports = {
  tokenExtractor,
  uknownEndpoint,
  errorHandler,
};
