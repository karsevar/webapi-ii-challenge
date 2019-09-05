const express = require('express');
const db = require('../data/db.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    db.find() 
        .then(result => {
            res.status(200).json(result) 
        })
        .catch(error => {
            res.status(500).json({error: "The posts information could not be retrieved." })
        })
});

router.post('/', validatePost, (req, res, next) => {
    db.insert(req.body)
        .then(result => {
            req.params.id = result.id 
            next();
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
}, returnObject);

router.get('/:id', validatePostId, (req, res) => {
    db.findById(req.params.id)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
} )

router.delete('/:id', validatePostId, (req, res, next) => {
    db.findById(req.params.id) 
        .then(result => {
            const postDelete = result
            db.remove(req.params.id) 
                .then(results => {
                    res.status(201).json(postDelete)
                })
                .catch(error => {
                    res.status(500).json(error) 
                })
        })
})


// Middleware:

function validatePost(req, res, next) {
    if (req.body.contents && req.body.title) {
        next();
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
}

function validatePostId(req, res, next) {
    db.findById(req.params.id) 
        .then(results => {
            if(results.length > 0) {
                next();
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
}

function returnObject(req, res, next) {
    db.findById(req.params.id) 
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}



module.exports = router;