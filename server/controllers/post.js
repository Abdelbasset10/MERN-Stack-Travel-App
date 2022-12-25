const Post = require('../models/post')

const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find({})
        if(posts.length ===0){
            return res.status(200).json({message:"There is no posts"})
        }
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

const createPost = async (req,res) => {
    try {
        const newPost = new Post({
            ...req.body
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

module.exports = {getAllPosts, getSinglePost, createPost, updatePost, deletePost, likeDislikePost}