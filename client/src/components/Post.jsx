import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AiFillLike} from 'react-icons/ai'
import { useState } from 'react'
import { likeDislike } from '../redux/features/postSlice'
import { likeDislikePost } from '../redux/api'

const Post = ({post}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)
    const userId = user?.user?._id
    const [likeLength,setLikeLength] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(post.likes.includes(userId))
    const readMore = () => {
        navigate(`/post/${post._id}`)
    }

    const handleLikeDislike = () => {
        likeDislikePost(post._id,userId)
        if(isLiked){
            setLikeLength(likeLength -1)
        }else{
            setLikeLength(likeLength +1)
        }
        setIsLiked(!isLiked)
    }
    return (
        <div className='w-full md:basis-[48%] lg:basis-[32%] boxShadow' >
            <div className='relative' >
                <img src={post?.postImg} alt="postImg" className='w-full h-[12rem]'/>
                <p className='absolute top-[0.5rem] left-[0.5rem] text-white font-bold text-xl' >{post?.creator}</p>
                <div className='p-4' >
                    <div className='flex gap-[1px] sm:gap-0 items-center justify-between text-blue-700' >
                        <div className='flex flex-wrap items-center gap-2' >
                            {post?.tags.map((tag,index)=>{
                                return (
                                    <p key={index} >#{tag}</p>
                                )
                            })}
                        </div>
                        <div className='flex flex-wrap justify-center items-center cursor-pointer' onClick={handleLikeDislike} >
                            <AiFillLike />
                            <p>{likeLength} Likes</p>
                        </div>
                    </div>
                    <p className='font-bold text-lg' >{post?.title}</p>
                    <p>{post?.desc.slice(0,50)} <span className='cursor-pointer text-blue-700 font-bold' onClick={readMore}>...read more</span> </p>
                </div>
            </div>
        </div>
  )
}

export default Post