import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import { openModal} from '../redux/features/modalSlice';
import { getPostsBySearch } from '../redux/features/postSlice';
import {setLogOut} from '../redux/features/authSlice'


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchData,setSearchData] = useState('')
    const {user} = useSelector((state)=>state.auth)
    const userName = user?.user?.userName

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(searchData);
        dispatch(getPostsBySearch(searchData))
        navigate(`/search?searchQuery=${searchData}`)
    }
    return (   
        <nav className='bg-[darkgray]  py-4 lg:px-10 xl:px-20 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between' >
            <h1 className='font-bold text-3xl' >MyTravel</h1>
            {userName && (
                <>
                    <p className='px-4 sm:px-0 text-center' >Logged in as : <span className='font-bold text-center' >{userName}</span> </p>
                    <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-10' >
                        <ul className='flex items-center gap-4' >
                            <Link to='/' >Home</Link>
                            <Link onClick={()=>dispatch(openModal())} >Add Tour</Link>
                            <Link to='/dashboard' >Dashboard</Link>
                            <Link to='/auth' onClick={()=>dispatch(setLogOut())} >Logout</Link>
                        </ul>
                        <form className='flex items-center gap-2 ' onSubmit={handleSearch} >
                            <input
                            type="text"
                            placeholder='Search Tour'
                            className='py-1 px-2 outline-none '
                            value={searchData}
                            onChange={(e)=>setSearchData(e.target.value)}/>
                            <button type='submit' ><BsSearch/></button>
                        </form>
                    </div>
            </>
            )}
        </nav>
    )
}

export default Navbar