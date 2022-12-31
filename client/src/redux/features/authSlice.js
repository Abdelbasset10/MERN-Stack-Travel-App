import * as api from '../api'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const login = createAsyncThunk("/auth/login",async({userData,navigate,toast},{rejectWithValue}) =>{
    try {
        const response = await api.signIn(userData)
        toast.success("You Signed In succefully !!");
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const register = createAsyncThunk("/auth/register",async ({userData,navigate,toast},{rejectWithValue}) =>{
    try {
        const response = await api.signUp(userData)
        toast.success("You Signed Up succefully !!");
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
    
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:""
    },
    reducers:{
        setUser : (state,action) =>{
            state.user = action.payload
        },
        setLogOut : (state,action) =>{
            localStorage.clear()
            state.user = null
        },
    },
    extraReducers:{
        [login.pending]: (state,action) => {
            state.loading = true
        },
        [login.fulfilled] : (state,action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending] : (state,action) =>{
            state.loading = true
        },
        [register.fulfilled] : (state,action) => {
            state.user = action.payload
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
            state.loading = true
        },
        [register.rejected] : (state,action) => {
            state.user = null
            state.error = action.payload.message;
            state.loading = true
        },
    }
})

export const {setUser, setLogOut} = authSlice.actions

export default authSlice.reducer