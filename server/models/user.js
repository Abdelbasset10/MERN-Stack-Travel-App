const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        uinique:true
    },
    password:{
        type:String,
        min:3
    },
    userImg:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)