const logger = require('./logger');

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

const errorhandler = (error, req, res, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    }

    else if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: 'token missing or invalid' });
    }

    else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' });
    }

    next(error);
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
  
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '');
    } 
    
    else {
        req.token = null;
    }
  
    next();
  };

module.exports = {
    unknownEndpoint,
    errorhandler,
    tokenExtractor,
};