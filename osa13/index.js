const { PORT } = require("./util/config");
const express = require("express");
const { connectToDatabase } = require("./util/db");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const AuthorsRouter = require("./controllers/authors");
const ReadingsRouter = require("./controllers/readinglists");
const logoutRouter = require("./controllers/logout");
const { uknownEndpoint, errorHandler } = require("./util/middleware");

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", AuthorsRouter);
app.use("/api/readinglists", ReadingsRouter);
app.use("/api/logout", logoutRouter);
app.use(uknownEndpoint);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
