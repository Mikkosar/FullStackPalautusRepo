const express = require("express");
const models = require("../models");
const { tokenExtractor } = require("../util/middleware");
const { Reading } = models;

const router = express.Router();

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    if (userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to create this reading" });
    }

    if (!userId || !blogId) {
      return res.status(400).json({ error: "userId and blogId are required" });
    }

    const reading = await Reading.create({
      userId,
      blogId,
      read: false,
    });

    res.status(201).json({
      userId: reading.userId,
      blogId: reading.blogId,
    });
  } catch (error) {
    console.error("Error creating reading list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const reading = await Reading.findByPk(id);
    if (!reading) {
      return res.status(404).json({ error: "Reading not found" });
    }

    if (reading.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this reading" });
    }

    reading.read = read;
    await reading.save();
    res.status(200).json({
      id: reading.id,
      read: reading.read,
    });
  } catch (error) {
    console.error("Error updating reading list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
