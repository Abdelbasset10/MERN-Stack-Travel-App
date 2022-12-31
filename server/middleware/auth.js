const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            console.log('No Token !')
        }else{
            const payload = jwt.verify(token,process.env.JWT_SECRET)
            req.user = payload 
            next()
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = auth