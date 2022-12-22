import React, {useState, useEffect} from 'react'
import {CLOSE_MODAL} from '../redux/modal/actionTypes'
import {useDispatch, useSelector} from 'react-redux'
import {FaTimes} from 'react-icons/fa'
import {posts} from '../data'

const PostModal = () => {
    const dispatch = useDispatch()
    const [postData,setPostData] = useState({
      title:"",desc:"",tags:"",postImg:""
    })
        const {postId }= useSelector((state)=>state.modal)    
        useEffect(()=>{
          if(postId) {
            const post = posts.find((p)=>p.id === postId)
            setPostData({
              ...postData,title:post.title ,desc:post.desc ,tags:post.tags
            })
          }
        },[postId])  
      const {isUpdatePost} = useSelector((state)=>state.modal)
      const handleChange = (e) => {
        setPostData({...postData,[e.target.name]:e.target.value})
      }
      const handleSubmit = (e) => {
        e.preventDefault()
        if(postId){
          console.log('Update')
        }else{
          console.log('create')
        }
        setPostData({
          title:"",desc:"",tags:"",postImg:""
        })
      }
  return (
    <div className='z-20	 w-full fixed top-0 h-screen bg-[rgba(0,0,0,0.4)]'>
          <div className='z-20	 w-[90%] sm:w-[80%] md:w-[70%] mx-auto mt-[3rem] relative bg-white px-4 sm:px-8 py-8' >
            <p className='font-bold text-2xl mb-[2rem]' >{isUpdatePost ? 'Update Your Travel Memory !' : 'Add a New Travel Memory !'}</p>
            <FaTimes
            className='absolute top-[1rem] right-[1rem] text-3xl cursor-pointer text-red-700'
            onClick={()=>dispatch({type:CLOSE_MODAL})}/>
            <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}>
              <input type="text"
              placeholder='Title'
              value={postData.title}
              name="title"
              onChange={handleChange}
              className='h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
              />
              <input type="text"
              placeholder='Tags'
              value={postData.tags}
              name="tags"
              onChange={handleChange}
              className='h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
              />
              <textarea rows="4" cols="50"
              placeholder='Description'
              value={postData.desc}
              name="desc"
              onChange={handleChange}
              className='outline-none py-2 px-4 border-[darkgray] border-[1px]' >
              </textarea>
              <input type="file"
              value={postData.postImg}
              name="postImg"
              onChange={handleChange} 
              />
              <button type='submit' className='bg-blue-300 h-[40px] text-white' >{isUpdatePost ? 'Update' : 'Add'}</button>
            </form>
          </div> 
        </div>
  )
}

export default PostModal