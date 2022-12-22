import React from 'react'
import { useNavigate } from 'react-router-dom'
import {AiFillLike} from 'react-icons/ai'

const Post = ({post}) => {
    const navigate = useNavigate()
    
    const readMore = () => {
        navigate(`/post/${post.id}`)
    }
    return (
        <div className='w-full md:basis-[48%] lg:basis-[32%] boxShadow' >
            <div className='relative' >
                <img src={post.img} alt="postImg" className='w-full h-[12rem]'/>
                <p className='absolute top-[0.5rem] left-[0.5rem] text-white font-bold text-xl' >{post.userName}</p>
                <div className='p-4' >
                    <div className='flex gap-[1px] sm:gap-0 items-center justify-between text-blue-700' >
                        <div className='flex flex-wrap items-center gap-2' >
                            {post.tags.map((tag,index)=>{
                                return (
                                    <p key={index} >#{tag}</p>
                                )
                            })}
                        </div>
                        <div className='flex flex-wrap justify-center items-center' >
                            <AiFillLike />
                            <p>9 Likes</p>
                        </div>
                    </div>
                    <p className='font-bold text-lg' >{post.title}</p>
                    <p>{post.desc.slice(0,50)} <span className='cursor-pointer text-blue-700 font-bold' onClick={readMore}>...read more</span> </p>
                </div>
            </div>
        </div>
  )
}

export default Post