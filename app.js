const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const notesRouter = require('./controllers/notes');

const app = express();

logger.info('Authenticating with MongoDB...');
mongoose
.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => logger.info('Database connection successful.'))
.catch(error => logger.error('Error connecting to MongoDB:\n', error.message));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
