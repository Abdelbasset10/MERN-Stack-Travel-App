const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SignUp = async (req,res) => {
    try {
        const {userName, email, password, confirmPassword} = req.body
        if(!userName || !email || !password || !confirmPassword){
            return res.json({message:"You have to fill your informations !"})
        }
        const isExistUserName = await User.findOne({userName:userName})
        const isExistUserEmail = await User.findOne({email:email})
        if(isExistUserName){
            return res.json({message:"This userName already Exist !!"})
        }
        if(isExistUserEmail){
            return res.json({message:"This email already Exist !!"})
        }
        if(password !== confirmPassword){
            return res.json({message:"Passwords are incorrects !!"})
        }
        const hashPassword = await bcrypt.hash(password,12)
        const newUser = new User({
            userName, email, password:hashPassword
        })
        await newUser.save()
        const token = jwt.sign({id:newUser._id, userName:newUser.userName},'JWT_SECRET',{expiresIn:'3d'})
        res.status(201).json({user:newUser,token})
    } catch (error) {
        console.log(error)
    }
}

const SignIn = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.json({message:"You have to fill Your informations !!"})
        }
        const isExistUser = await User.findOne({email:email})
        if(!isExistUser){
            return res.status(404).json({message:"This User does not exist !!"})
        }
        const isValidPassword = await bcrypt.compare(password,isExistUser.password)
        if(!isValidPassword){
            return res.json({message:"The Password is incorrect !!"})
        }
        const token = jwt.sign({id:isExistUser._id, userName:isExistUser.userName},'JWT_SECRET',{expiresIn:'3d'})
        res.status(201).json({user:isExistUser,token})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {SignUp, SignIn}