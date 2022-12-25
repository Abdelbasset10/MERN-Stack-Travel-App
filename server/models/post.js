const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        default:''
    },
    desc:{
        type:String,
        default:''
    },
    tags:{
        type:Array,
        default:[]
    },
    postImg:{
        type:String,
        default:''
    },
    likes:{
        type:Array,
        default:[]
    }
    
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)