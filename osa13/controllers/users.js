const express = require("express");
const models = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../util/middleware");
const { User, Blog, Reading } = models;

const router = express.Router();

router.get("/", tokenExtractor, async (req, res) => {
  const users = await models.User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  console.log(JSON.stringify(users, null, 2));
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
});

router.put("/:username", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this user" });
    }

    user.username = req.body.username;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", tokenExtractor, async (req, res) => {
  try {
    let where = {};

    if (req.query.read !== undefined) {
      const value = req.query.read === "true";
      where.read = value;
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: {
        model: Blog,
        as: "readings",
        attributes: ["id", "url", "title", "author", "likes", "year"],
        through: {
          attributes: ["read", "blogId"],
          where,
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
