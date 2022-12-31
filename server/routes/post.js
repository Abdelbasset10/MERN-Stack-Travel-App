const express = require('express')
const router = express.Router()

const {getAllPosts, getSinglePost, getUserPosts, createPost, updatePost, deletePost, likeDislikePost, commentePost, searchPost, similairPosts } = require('../controllers/post')
const auth = require('../middleware/auth')

router.get('/',auth,getAllPosts)
router.get('/search',auth,searchPost)
router.get('/similair/:id',auth,similairPosts)
router.get('/dashboard/:userName',auth,getUserPosts)
router.get('/:id',auth,getSinglePost)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/likeDislike/:id',auth,likeDislikePost)
router.patch('/comment/:id',auth,commentePost)


module.exports = router