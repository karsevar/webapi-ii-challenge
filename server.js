 const express = require('express');

 const postRoute = require('./routes/postRoute.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postRoute)

module.exports = server;

// // Server test on the root url without /api extension.
// server.get('/', (req, res) => {
//     res.status(200).json({message: 'Success!!!'})
// })

// // GET request for all the posts in database:
// server.get('/api/posts', (req, res) => {
//     db.find() 
//         .then(result => res.status(201).json(result))
//         .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
// })

// // POST request functionality for posts in the data base:
// server.post('/api/posts', (req, res) => {

//     const postObject = req.body;
//     console.log('Post request in the posts section', req.body)

//     if (postObject.contents && postObject.title) {
//         db.insert(postObject)
//             .then(result => {
//                 // res.status(200).json(result)

//                 // A round about way to return the newly 
//                 // created post with the success message.
//                 db.findById(result.id)
//                     .then(result => {
//                         res.status(201).json(result)
//                     })
//                     .catch(err => {
//                         console.log(err) 
//                     })
//             })
//             .catch(err => {
//                 res.status(500).json({ error: "There was an error while saving the post to the database" })
//             })
//     } else {
//         res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
//     }
// })

// // GET request for posts according to id:
// server.get('/api/posts/:id', (req, res) => {
//     const id = req.params.id;


//     db.findById(id)
//         .then(result => {
//             console.log(result.length)
//             if(result.length > 0) {
//                 res.status(201).json(result) 
//             } else {
//                 res.status(404).json({ message: "The post with the specified ID does not exist." }) 
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ error: "The post information could not be retrieved." })
//         })
// })

// // DELETE posts functionality:
// server.delete('/api/posts/:id', (req, res) => {
//     const postId = req.params.id;

//     db.findById(postId) 
//         .then(result => {
//             const postDelete = result 
//             if(result.length > 0) {
//                 db.remove(postId)
//                     .then(results => {
//                         res.status(200).json(postDelete)
//                     })
//                     .catch(err => {
//                         res.status(500).json({ error: "The post could not be removed" })
//                     })
//             } else {
//                 res.status(404).json({ message: "The post with the specified ID does not exist." })
//             }
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// // PUT request for posts functionality:
// server.put('/api/posts/:id', (req, res) => {
//     const postId = req.params.id;
//     const postUpdate = req.body;
    
//     console.log(postUpdate);

//     db.findById(postId) 
//         .then(result => {
//             if (result.length > 0) {

//                 if (postUpdate.title && postUpdate.contents) {
//                     db.update(postId, postUpdate)
//                         .then(results => {
//                             // console.log(results) 
//                             // res.status(200).json(results)

//                             // returning the updated object:
//                             db.findById(postId) 
//                                 .then(success => {
//                                     res.status(200).json(success)
//                                 })
//                                 .catch(err => {
//                                     console.log(err)
//                                 })
//                         })
//                         .catch(err => {
//                             res.status(500).json({ error: "The post information could not be modified." })
//                         })
//                 } else {
//                     res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
//                 }

//             } else {
//                 res.status(404).json({ message: "The post with the specified ID does not exist." })
//             }
//         })
// })

// // GET request for comments using post id:
// server.get('/api/posts/:id/comments', (req, res) => {
//     const postId = req.params.id;
//     console.log('id from comments request', postId);

//     db.findById(postId)
//         .then(posts => {
//             if (posts.length > 0) {
//                 db.findPostComments(Number(postId))
//                     .then(result => {
//                         res.status(201).json(result) 
//                     })
//                     .catch(err => {
//                         res.status(500).json({ error: "The comments information could not be retrieved." })
//                     })
//                 } else {
//                     res.status(404).json({ message: "The post with the specified ID does not exist." })
//                 }
//             })
//         .catch(err => {
//             console.log(err)
//         })
// })

// // POST request for comments section of the dataset:
// server.post('/api/posts/:id/comments', (req, res) => {
//     const postId = req.params.id;
//     const commentObject = req.body

//     // adding post_id parameter to the commentObject 
//     // for the insertComment function to work:
//     commentObject.post_id = postId

//     // Will need to create if statements for just in case the 
//     // post id doesn't exist.
//     db.findById(postId) 
//         .then(posts => {
//             if(posts.length > 0) {
//                 // console.log(commentObject);

//                 if (commentObject.text) {
//                     db.insertComment(commentObject) 
//                         .then(result => {
//                             // console.log(result)
//                             // res.status(201).json(result)

//                             // returning back the comment that was posted
//                             db.findCommentById(result.id)
//                                 .then(result => {
//                                     res.status(201).json(result)
//                                 })
//                                 .catch(err => {
//                                     console.log(err) 
//                                 })
//                         })
//                         .catch(err => {
//                             res.status(500).json({ error: "There was an error while saving the comment to the database" })
//                         })
//                 } else {
//                     res.status(400).json({ errorMessage: "Please provide text for the comment." })
//                 }
//             } else {
//                 res.status(404).json({ message: "The post with the specified ID does not exist." }) 
//             }
//         })

// })

