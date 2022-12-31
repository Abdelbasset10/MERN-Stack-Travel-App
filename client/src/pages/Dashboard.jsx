import React, {useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostEdit from '../components/PostEdit'
import { getUserPosts } from '../redux/features/postSlice'

const Dashboard = () => {
  const disptach = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const userName = user?.user?.userName
  const userPosts = useSelector((state)=>state.post.userPosts)
  const {posts,loading} = useSelector((state)=>({...state.post}))

  useEffect(()=>{
    disptach(getUserPosts(userName))
  },[userName,posts])

  return (
    <div>
        <p className='text-center font-bold my-8' >Dashboard : {userName}</p>
        <div className='w-[80%] md:w-[70%] lg:w-[60%] m-auto flex flex-col gap-4' >
            {userPosts?.map((post)=>{
                return (
                    <PostEdit post={post} key={post.id} />
                )
            })}
        </div>
    </div>
  )
}

export default Dashboard