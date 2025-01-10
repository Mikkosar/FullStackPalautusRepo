const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: [],
    user: user.id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (updatedBlog) {
    res.json(updatedBlog);
  }
});

blogsRouter.put("/:id/comments", async (req, res) => {
  const id = req.params.id;
  const comment = req.body.comment;
  console.log(comment);

  try {
    const blogToComment = await Blog.findById(id);

    if (!blogToComment) {
      return res.status(404).json({ error: "blog not found" });
    }

    blogToComment.comments = blogToComment.comments.concat(comment);

    const updatedBlog = await blogToComment.save();

    res.json(updatedBlog);
  } catch (exception) {
    res.status(400).json({ error: exception.message });
  }
});

module.exports = blogsRouter;
