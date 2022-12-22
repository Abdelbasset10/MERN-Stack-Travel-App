import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { comments, posts } from '../data'
import {FaArrowLeft} from 'react-icons/fa'
import {TbCalendarTime} from 'react-icons/tb'
import user from '../assets/user.png'

const PostDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const postId = params.id
  const post = posts.find((p)=> p.id === parseInt(postId))
  const [commentData,setCommentData] = useState('')
  const focusInput = useRef()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(commentData)
    setCommentData('')
  }
  return (
    <div>
      <div className='w-[90%] sm:w-[80%] mx-auto my-[3rem] boxShadow' >
        <img src={post.img} alt="postImg" className='w-full sm:h-[30rem] object-cover' />
        <div className='flex flex-col gap-4 p-4' >
          <div className='flex items-center justify-between sm:w-[50%]' >
            <FaArrowLeft className='text-2xl cursor-pointer' onClick={()=>navigate('/')} />
            <p className='text-center font-bold' >{post.title}</p>
          </div>
          <p className='font-bold' >Created By : {post.userName}</p>
          <div className='flex items-center gap-2 text-blue-700' >
            {post.tags.map((tag,index)=>{
              return (
                <p key={index} >#{tag}</p>
              )
            })}
          </div>
          <div className='flex items-center gap-1' >
            <TbCalendarTime className='text-2xl' />
            <p>2 mounts ago</p>
          </div>
          <p className='text-sm md:text-base' >{post.desc}</p>
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
              {comments.map((comment)=>{
                return(
                  <div key={comment.id} className='flex items-center gap-4' >
                    <img src={comment.userImg} alt="userImg" className='w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]' />
                    <div>
                      <div className='flex items-center gap-2' >
                        <p className=' text-sm sm:text-base text-blue-700 font-bold' >{comment.userName}</p>
                        <p className=' text-[10px] sm:text-sm' >2 mounts ago</p>
                      </div>
                      <p className='text-sm md:text-base' >{comment.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail