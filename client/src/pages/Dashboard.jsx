import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostEdit from '../components/PostEdit'
import { getUserPosts } from '../redux/features/postSlice'

const Dashboard = () => {
  const disptach = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const userName = user?.user?.userName
  const userPosts = useSelector((state)=>state.post.userPosts)

  useEffect(()=>{
    disptach(getUserPosts(userName))
  },[userPosts])

  return (
    <div>
        <p className='text-center font-bold my-8' >Dashboard : {userName}</p>
        <div className='w-[80%] md:w-[70%] lg:w-[60%] m-auto flex flex-col gap-4' >
            {userPosts?.map((post,index)=>{
                return (
                    <PostEdit post={post} key={index} />
                )
            })}
        </div>
    </div>
  )
}

export default Dashboard