const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        default:''
    },
    creator:String,
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
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default : []
    }
    
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)