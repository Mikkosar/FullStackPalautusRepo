const jwt = require("jsonwebtoken");
const express = require("express");
const { SECRET } = require("../util/config");
const { User, Session } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  const passwordCorrect = password === "salainen";

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.disabled) {
    return res.status(401).json({
      error: "user disabled",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60, // 1 hour
  });

  await Session.create({
    userId: user.id,
    token: token,
  });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
