import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import { login, register} from '../redux/features/authSlice'

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error} = useSelector((state) => ({ ...state.auth }));

  const [isSignUp,setIsSignUp] = useState(true)
  const [err,setErr] = useState('')
  const [userData,setUserData] = useState({
    userName:"", email:"",password:"",confirmPassword:""
  })

  const handleChange = (e) => {
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp){
      if(userData.userName === '' || userData.email === '' || userData.password === '' || userData.confirmPassword === '') {
        return setErr('You have to fill all your informations !')
      }
      if(userData.password !== userData.confirmPassword){
        return setErr('Password and Confirm password are not the same !')
      }
      dispatch(register({userData,navigate,toast}))
    }else{
      if(userData.email === '' || userData.password === ''){
        return setErr('You have to fill all your informations !')
      }
      dispatch(login({userData,navigate,toast}))
    }
    setUserData({
      userName:"", email:"",password:"",confirmPassword:""
    })
    setErr('')
  }
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <div className='w-full' >
      <div className=' w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] border-[1px] border-[darkgray] boxShadow mx-auto mt-[3rem] mb-[1rem] xl:mt-[5rem] flex flex-col py-4 px-4 sm:px-8' >
        <div className='flex flex-col items-center ' >
          <FaUserCircle className='text-3xl' />
          <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
          

        </div>
        <p className='my-4' >{err}</p>
        <div className='flex flex-col gap-4'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            {isSignUp && <input
            type="text"
            placeholder='User Name'
            className='h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
            name="userName"
            value={userData.userName}
            onChange={handleChange}
            />}
            <input type="email"
            placeholder='Email'
            className='h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
            name="email"
            value={userData.email}
            onChange={handleChange}
            />
            <input type="password"
            placeholder='password'
            className='h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
            name="password"
            value={userData.password}
            onChange={handleChange}
            />
            {isSignUp && <input type="password"
            placeholder='Confirm Password'
            className='h-[40px] outline-none py-2 px-4 border-[darkgray] border-[1px]'
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            />}
            <button type='submit'className='bg-blue-300 h-[40px] text-white'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          </form>
          <div className='flex items-center justify-center gap-2' >
            <p>{isSignUp ? "Already have Account ?" : "Dont Have Account ?"}</p>
            <p className='text-blue-300 cursor-pointer font-bold' onClick={()=>setIsSignUp(!isSignUp)} >{isSignUp ? "Sign In" : "Sign Up"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth