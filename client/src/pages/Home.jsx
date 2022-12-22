import React from 'react'
import Post from '../components/Post'
import { posts } from '../data'

const Home = () => {
  return (
    <div>
      <div className='w-[80%] mx-auto my-[2rem] flex flex-wrap gap-4'>
        {posts.map((post)=>{
          return(
            <Post post={post} key={post.id}  />
          )
        })}
      </div>
    </div>
  )
}

export default Home