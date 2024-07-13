const { info, error } = require('./logger');

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

const errorhandler = (error, req, res, next) => {
    error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
}

module.exports = {
    unknownEndpoint,
    errorhandler,
};