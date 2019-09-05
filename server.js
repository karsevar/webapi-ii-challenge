 const express = require('express');

 const postRoute = require('./routes/postRoute.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postRoute)

module.exports = server;

