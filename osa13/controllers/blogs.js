const express = require("express");
const models = require("../models");
const { tokenExtractor } = require("../util/middleware");
const { Op } = require("sequelize");
const { Blog, User, Reading } = models;

const router = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", tokenExtractor, async (req, res) => {
  let where = {};

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.substring]: req.query.search } },
      { author: { [Op.iLike]: req.query.search } },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
    where,
    order: [["likes", "DESC"]],
  });
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const blog = await Blog.create({ ...req.body, userId: req.user.id });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      if (req.blog.userId !== req.user.id) {
        return res
          .status(403)
          .json({ error: "You do not have permission to delete this blog" });
      }
      await Reading.destroy({
        where: { blogId: req.blog.id },
      });
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", tokenExtractor, blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      const updatedBlog = await req.blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error("Error liking blog:", error.name);
    next(error);
  }
});

module.exports = router;
