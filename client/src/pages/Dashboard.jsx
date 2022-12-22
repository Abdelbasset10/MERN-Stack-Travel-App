import React from 'react'
import PostEdit from '../components/PostEdit'
import { posts } from '../data'

const Dashboard = () => {
  return (
    <div>
        <p className='text-center font-bold my-8' >Dashboard : Abdelbasset</p>
        <div className='w-[80%] md:w-[70%] lg:w-[60%] m-auto flex flex-col gap-4' >
            {posts.map((post)=>{
                return (
                    <PostEdit post={post} key={post.id} />
                )
            })}
        </div>
    </div>
  )
}

export default Dashboard