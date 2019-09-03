const db = require('./data/db.js') 
const express = require('express');

const server = express();

server.use(express.json());

// Server test on the root url without /api extension.
server.get('/', (req, res) => {
    res.status(200).json({message: 'Success!!!'})
})

// GET request for all the posts in database:
server.get('/api/posts', (req, res) => {
    db.find() 
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

module.exports = server