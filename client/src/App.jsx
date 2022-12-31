import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import { setUser } from './redux/features/authSlice'
import { ToastContainer } from 'react-toastify'
import PostModal from './components/PostModal'
import { getAllPosts } from './redux/features/postSlice'

const App = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))
  const {isModal }= useSelector((state)=>state.modal)   
  const {posts,loading} = useSelector((state)=>({...state.post}))

  useEffect(()=>{
    dispatch(setUser(user))
  },[])

  
  
  
  return (
    <div>
      <BrowserRouter >
        <Navbar />
        {isModal && (
          <PostModal />
        )}
    
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/post/:id' element={<PostDetail/>} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  )
}

export default App
