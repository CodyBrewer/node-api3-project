const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ message: "<h2>Let's write some middleware!</h2>" });
});

module.exports = server;
