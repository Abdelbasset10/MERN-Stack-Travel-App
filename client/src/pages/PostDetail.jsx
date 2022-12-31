import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {FaArrowLeft} from 'react-icons/fa'
import {TbCalendarTime} from 'react-icons/tb'
import user from '../assets/user.png'
import { comment, getPost, getSimilairPosts } from '../redux/features/postSlice'
import Comment from '../components/Comment'
import { commentPost, similairPosts } from '../redux/api'
import Post from '../components/Post'

const PostDetail = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const postId = params.id
  const [commentData,setCommentData] = useState('')
  const focusInput = useRef()
  const {post} = useSelector((state)=>state.post)
  const similairPosts = useSelector((state)=>state.post.similairPosts)
  const {user} = useSelector((state)=>state.auth)
  const userId = user?.user?._id
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await commentPost(post?._id,userId,commentData)
    setCommentData('')
  }
  useEffect(()=>{
    dispatch(getPost(postId))
  },[postId])

  useEffect(()=>{
    dispatch(getSimilairPosts(postId))

  },[])
  return (
    <div>
      <div className='w-[90%] sm:w-[80%] mx-auto my-[3rem] boxShadow' >
        <img src={post?.postImg} alt="postImg" className='w-full sm:h-[30rem] object-cover' />
        <div className='flex flex-col gap-4 p-4' >
          <div className='flex items-center justify-between sm:w-[50%]' >
            <FaArrowLeft className='text-2xl cursor-pointer' onClick={()=>navigate('/')} />
            <p className='text-center font-bold' >{post?.title}</p>
          </div>
          <p className='font-bold' >Created By : {post?.creator}</p>
          <div className='flex items-center gap-2 text-blue-700' >
            {post?.tags.map((tag,index)=>{
              return (
                <p key={index} >#{tag}</p>
              )
            })}
          </div>
          <div className='flex items-center gap-1' >
            <TbCalendarTime className='text-2xl' />
            <p>2 mounts ago</p>
          </div>
          <p className='text-sm md:text-base' >{post?.desc}</p>
        </div>
        <div className='flex flex-col gap-4 p-4 border-t-[1px] border-[black]' >
          <div className='flex items-center gap-4'>
            <p className='text-blue-700' >1 comment</p>
            <p className='cursor-pointer' onClick={()=>focusInput.current.focus()} >Add Comment</p>
          </div>
          <div className='flex flex-col gap-4' >
            <div className='flex items-center gap-4' >
              <img src={user} alt="userImg" className='w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]' />
              <form className='w-full' onSubmit={handleSubmit} >
                <input
                type="text"
                placeholder='Add Comment'
                ref={focusInput}
                value={commentData}
                className='w-full h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
                onChange={(e)=>setCommentData(e.target.value)}
                />
              </form>
            </div>
            <div className='flex flex-col gap-2' >
            {post?.comments?.map((comment,index)=>{
                return(
                  <Comment comment={comment} key={index} />
                )
              })}
            </div>
          </div>
        </div>
        <div className='p-[1rem]' >
          <h1 className='font-bold text-center' >Similair Posts</h1>
          <div className='flex flex-wrap gap-4 ' >
            {similairPosts?.map((post,index)=>{
              if(post._id !== postId){
            return(
              <Post post={post} key={index}  />
            )
          }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail