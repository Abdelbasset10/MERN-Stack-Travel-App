import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import modalReducer from './features/modalSlice'
import postReducer from './features/postSlice'

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        modal:modalReducer,
        post:postReducer
    }
})

export default store