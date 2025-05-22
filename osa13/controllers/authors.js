const express = require("express");
const models = require("../models");
const { fn, col } = require("sequelize");
const { tokenExtractor } = require("../util/middleware");

const { Blog } = models;

const router = express.Router();

router.get("/", tokenExtractor, async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [fn("COUNT", col("id")), "blogs"],
      [fn("SUM", col("likes")), "likes"],
    ],
    group: ["author"],
    order: [[fn("SUM", col("likes")), "DESC"]],
  });

  res.json(authors);
});

module.exports = router;
