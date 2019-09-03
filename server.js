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

// GET request for posts according to id:
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;


    db.findById(id)
        .then(result => {
            console.log(result.length)
            if(result.length > 0) {
                res.status(201).json(result) 
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." }) 
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

// GET request for comments using post id:
server.get('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    console.log('id from comments request', postId);

    db.findById(postId)
        .then(posts => {
            if (posts.length > 0) {
                db.findPostComments(Number(postId))
                    .then(result => {
                        res.status(201).json(result) 
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The comments information could not be retrieved." })
                    })
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
        .catch(err => {
            console.log(err)
        })
})

module.exports = server