const Post = require('../models/post')

const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
}

const getSinglePost = async (req,res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"There is no post with that id !!"})
        }
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}

const getUserPosts = async (req,res) => {
    try {
        const {userName} = req.params
        const posts = await Post.find({creator:userName})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
}

const createPost = async (req,res) => {
    try {
        const newPost = new Post({
            ...req.body,creator:req.user.userName
        })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async (req,res) => {
    try {
        const {id} = req.params
        const getPostAndUpdate = await Post.findByIdAndUpdate(id,req.body,{new:true})
        if(!getPostAndUpdate){
            return res.status(404).json({message:"There is no post with that id !!"})
        }
        res.status(200).json(getPostAndUpdate)
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req,res) => {
    try {
        const {id} = req.params
        const getPostAndDelete = await Post.findByIdAndDelete(id)
        if(!getPostAndDelete){
            return res.status(404).json({message:"There is no post with that id !!"})
        }
        res.status(200).json(getPostAndDelete)
    } catch (error) {
        console.log(error)
    }
}

const likeDislikePost = async (req,res) => {
    try {
        const {id} = req.params
        const {currentUser} = req.body
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"There is no post with that id !!"})
        }
        if(post.likes.includes(currentUser)){
            await post.updateOne({$pull : {likes:currentUser}})
            return res.status(200).json({message:"The post has been disliked"})
        }else{
            await post.updateOne({$push : {likes:currentUser}})
            return res.status(200).json({message:"The post has been liked"})
        }
    } catch (error) {
        console.log(error)
    }
}

const commentePost = async (req,res) => {
    try {
        const {id} = req.params
        const {userId,text} = req.body
        const post = await Post.findById(id)
        await post.updateOne({$push : {comments : {userId,text}}})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}

const searchPost = async (req,res) => {
    try {
        const {searchQuery} = req.query
        const title = new RegExp(searchQuery, "i")
        const posts = await Post.find({title})
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message:'something went wrong !!'})
    }
}

const similairPosts = async (req,res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        const tag = post.tags
        const similairPosts = await Post.find({tags: {$in : tag}})
        res.json(similairPosts)
    } catch (error) {
        res.status(404).json({message:'something went wrong !!'})
    }
}

module.exports = {getAllPosts, getSinglePost, getUserPosts, createPost, updatePost, deletePost, likeDislikePost, commentePost, searchPost, similairPosts }