import React, {useEffect, useState} from 'react'
import { fetchUser } from '../redux/api'

const Comment = ({comment}) => {
    const [user,setUser] = useState()
    useEffect(()=>{
        const getUser = async () => {
            const {data} = await fetchUser(comment.userId)
            setUser(data)
        }
        getUser()

    },[comment])
    return (
        <div className='flex items-center gap-4' >
            <img src={comment?.userImg} alt="userImg" className='w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]' />
            <div>
                <div className='flex items-center gap-2' >
                    <p className=' text-sm sm:text-base text-blue-700 font-bold' >{user?.userName}</p>
                    <p className=' text-[10px] sm:text-sm' >2 mounts ago</p>
                </div>
                <p className='text-sm md:text-base' >{comment.text}</p>
            </div>
        </div>
)
}

export default Comment