import React from 'react'
import { useDispatch } from 'react-redux'
import { OPEN_MODAL, IS_UPDATE_POST } from '../redux/modal/actionTypes'
import {AiFillDelete} from 'react-icons/ai'
import {FaEdit} from 'react-icons/fa'

const PostEdit = ({post}) => {
    const dispatch = useDispatch()
    
    const OpenUpdatePost = () => {
        dispatch({
            type:OPEN_MODAL
        })
        dispatch({
            type:IS_UPDATE_POST,
            payload:post.id
        })
    }
  return (
    <div className='flex flex-col sm:flex-row gap-4 boxShadow' >
        <div className='flex-[1]' >
            <img src={post.img} alt="postImg" className='w-full h-[10rem]' />
        </div>
        <div className='flex-[2] flex items-center justify-between pl-4 sm:pl-0 pb-4 sm:pb-0 pr-4' >
            <div className='flex flex-col gap-2' >
                <p className='font-bold' >{post.title}</p>
                <p>{post.desc.slice(0,49)}</p>
            </div>
            <div className='flex items-center gap-2' >
                <AiFillDelete className='text-3xl cursor-pointer text-red-700' />
                <FaEdit className='text-3xl cursor-pointer text-blue-700' onClick={OpenUpdatePost} />
            </div>
        </div>
    </div>
  )
}

export default PostEdit