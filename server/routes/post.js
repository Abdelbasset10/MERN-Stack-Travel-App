const express = require('express')
const router = express.Router()

const {getAllPosts, getSinglePost, createPost, updatePost, deletePost, likeDislikePost} = require('../controllers/post')
const auth = require('../middleware/auth')

router.get('/',auth,getAllPosts)
router.get('/:id',auth,getSinglePost)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/likeDislike/:id',auth,likeDislikePost)

module.exports = router