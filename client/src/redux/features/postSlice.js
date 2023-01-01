import * as api from '../api'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getAllPosts = createAsyncThunk("/posts/get", async (_,{rejectWithValue})=> {
    try {
        const {data} = await api.fetchAllPosts()
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getPost = createAsyncThunk("/posts/getOnePost", async (id,{rejectWithValue})=> {
    try {
        const {data} = await api.fetchPostId(id)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getUserPosts = createAsyncThunk("/posts/getUserPosts", async (userName,{rejectWithValue})=> {
    try {
        const {data} = await api.fetchUserPosts(userName)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const addPost = createAsyncThunk("/posts/create", async ({postData,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.createPost(postData)
        toast.success("Post created succefully !!")
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const updatepost = createAsyncThunk("/posts/update", async ({postId,postData,toast},{rejectWithValue})=> {
    try {
        const {data} = await api.updatePost(postId,postData)
        toast.success("Post updated succefully !!")
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const deletePost = createAsyncThunk("/posts/deletePost", async (id,{rejectWithValue})=> {
    try {
        const {data} = await api.deletePost(id)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const likeDislike = createAsyncThunk("/posts/likeDislike", async ({postId,userId},{rejectWithValue}) => {
    try {
        const {data} = await api.likeDislikePost(postId,userId)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const comment = createAsyncThunk("/posts/comment", async ({postId,userId,text},{rejectWithValue}) => {
    try {
        const {data} = await api.commentPost(postId,userId,text)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getPostsBySearch = createAsyncThunk("/posts/search", async (postTitle,{rejectWithValue}) => {
    try {
        const {data} = await api.searchPost(postTitle)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getSimilairPosts = createAsyncThunk("/posts/similair", async (postId,{rejectWithValue}) => {
    try {
        const {data} = await api.similairPosts(postId)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        userPosts:[],
        similairPosts:[],
        post:null,
        loading:false,
        error:false,
    },
    reducers:{

    },
    extraReducers:{
        [getUserPosts.pending] : (state,action) => {
            state.loading = true
        },
        [getUserPosts.fulfilled] : (state,action) => {
            state.userPosts = action.payload
            state.loading = false
        },
        [getUserPosts.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [getAllPosts.pending] : (state,action) => {
            state.loading = true
        },
        [getAllPosts.fulfilled] : (state,action) => {
            state.posts = action.payload
            state.loading = false
        },
        [getAllPosts.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [addPost.pending] : (state,action) => {
            state.loading = true
        },
        [addPost.fulfilled] : (state,action) => {
            state.posts = [...state,action.payload]
            state.loading = false
        },
        [addPost.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [getPost.pending] : (state,action) => {
            state.loading = true
        },
        [getPost.fulfilled] : (state,action) => {
            state.post= action.payload
            state.loading = false
        },
        [getPost.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [deletePost.pending] : (state,action) => {
            state.loading = true
        },
        [deletePost.fulfilled] : (state,action) => {
            state.posts= state.posts.filter((post)=>post._id !== action.paylaod._id)
            state.loading = false
        },
        [deletePost.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [updatepost.pending] : (state,action) => {
            state.loading = true
        },
        [updatepost.fulfilled] : (state,action) => {
            state.posts= state.posts.map((post)=>post._id === action.payload._id ? action.payload : post)
            state.loading = false
        },
        [updatepost.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [comment.pending] : (state,action) => {
            state.loading = true
        },
        [comment.fulfilled] : (state,action) => {
            state.post.comments= [...state.post,...state.post.comments,action.payload]
            state.loading = false
        },
        [comment.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [getPostsBySearch.pending] : (state,action) => {
            state.loading = true
        },
        [getPostsBySearch.fulfilled] : (state,action) => {
            state.posts = action.payload
            state.loading = false
        },
        [getPostsBySearch.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        [getSimilairPosts.pending] : (state,action) => {
            state.loading = true
        },
        [getSimilairPosts.fulfilled] : (state,action) => {
            state.similairPosts = action.payload
            state.loading = false
        },
        [getSimilairPosts.rejected] : (state,action) => {
            state.error = action.payload.message
            state.loading = false
        },
        
    },
})


export default postSlice.reducer
