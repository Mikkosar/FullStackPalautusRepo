const express = require("express");
const { getAsync } = require("../redis");
const router = express.Router();

router.get("/", async (_, res) => {
  const currentAmount = (await getAsync("added_todos")) || 0;
  res.json({ added_todos: currentAmount });
});

module.exports = router;
