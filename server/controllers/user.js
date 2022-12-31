const User = require('../models/user')

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({})
        if(users.length ===0){
            return res.status(200).json({message:"There is no users"})
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}

const getSingleUser = async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        const getUserAndUpdate = await User.findByIdAndUpdate(id,req.body,{new:true})
        if(!getUserAndUpdate){
            return res.status(404).json({message:"There is no user with that id !!"})
        }
        res.status(200).json(getUserAndUpdate)
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params
        const getUserAndDelete = await User.findByIdAndDelete(id)
        if(!getUserAndDelete){
            return res.status(404).json({message:"There is no user with that id !!"})
        }
        res.status(200).json(getUserAndDelete)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getAllUsers, getSingleUser, updateUser, deleteUser}