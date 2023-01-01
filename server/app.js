require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const connectDB = require('./db/connectDB')
const authRoutr = require('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/image", express.static("image"));

app.use('/auth',authRoutr)
app.use('/user',userRouter)
app.use('/post',postRouter)

const start = async () => { 
    mongoose.set("strictQuery", false);
    await connectDB(process.env.MONGO_URL)
    try {
        app.listen(5000,()=>{
            console.log('Server is listenning on Port 5000...')
        })
    } catch (error) {
        console.log(error)
    }
}

start()