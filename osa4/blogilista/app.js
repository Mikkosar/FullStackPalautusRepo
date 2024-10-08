const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const { info, error } = require("./utils/logger");
const { MONGODB_URI } = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');
app.use(middleware.tokenExtractor);

morgan.token('post-data', (request) => {
    return JSON.stringify(request.body)
});
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

mongoose.set('strictQuery', false);

info('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(() => {
        info('connected to MongoDB');
    })
    .catch((e) => {
        error('error connecting to MongoDB:'. e.message);
    });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/tests');
    app.use('/api/testing', testingRouter);
}


app.use(middleware.unknownEndpoint);
app.use(middleware.errorhandler);

module.exports = app;