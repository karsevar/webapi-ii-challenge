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

router.put('/:id', validatePostId, validatePost, (req, res, next) => {
    db.update(req.params.id, req.body) 
        .then(results => {
            next();
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
}, returnObject)

router.get('/:id/comments', validatePostId, (req, res) => {
    db.findPostComments(req.params.id)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

router.post('/:id/comments', validatePostId, validateComment, (req, res, next) => {
    const commentObject = req.body

    commentObject.post_id = req.params.id;

    db.insertComment(commentObject)
        .then(results => {
            // res.status(201).json(results)
            req.commentId = results.id;
            next();
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
}, returnCommentObject)


// Middleware:

function returnCommentObject(req, res, next) {
    db.findCommentById(req.commentId) 
        .then(result => {
            res.status(201).json(result) 
        })
        .catch(error => {
            res.status(500).json(error) 
        })
}

function validateComment(req, res, next) {
    if (req.body.text) {
        next();
    } else {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
}

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