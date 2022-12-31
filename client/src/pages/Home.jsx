import React, {useEffect} from 'react'
import Post from '../components/Post'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPosts } from '../redux/features/postSlice'

const Home = () => {
  const dispatch = useDispatch()
  const {posts,loading} = useSelector((state)=>({...state.post}))
  useEffect(()=>{
    dispatch(getAllPosts())
  },[])
  
  return (
    <div>
      <div className='w-[80%] mx-auto my-[2rem] flex flex-wrap gap-4'>
        {posts?.map((post,index)=>{
          return(
            <Post post={post} key={index}  />
          )
        })}
      </div>
    </div>
  )
}

export default Home