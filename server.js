const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { logger } = require('./middleware/index');

const server = express();

// Middleware:
// Built-In
server.use(express.json());
// Third party
server.use(helmet());
server.use(cors());
// Custom
server.use(logger);

server.get('/', (req, res) => {
  // eslint-disable-next-line quotes
  res.status(200).send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
