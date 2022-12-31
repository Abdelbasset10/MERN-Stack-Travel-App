import {createSlice} from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name:"modal",
    initialState:{
        isModal : false,
        isUpdatePost:false,
        postId:null
    },
    reducers :{
        openModal : (state,action) =>{
            state.isModal = true
        },
        closeModal : (state,action) =>{
            state.isModal = false
            state.isUpdatePost = false
            state.postId = null
        },
        isUpdatePost : (state,action) => {
            state.isModal = true
            state.isUpdatePost = true
            state.postId = action.payload
        }

    },
    extraReducers:{

    }
})

export const {openModal, closeModal, isUpdatePost} = modalSlice.actions

export default modalSlice.reducer