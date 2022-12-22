import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PostModal from './components/PostModal'
import PostDetail from './pages/PostDetail'

const App = () => {
  const {isModal} = useSelector((state)=>state.modal)

  return (
    <div>
      <BrowserRouter >
        <Navbar />
        {isModal && (
          <PostModal />
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:id' element={<PostDetail/>} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
