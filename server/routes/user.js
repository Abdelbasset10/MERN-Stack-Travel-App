const express = require('express')
const router = express.Router()

const {getAllUsers, getSingleUser, updateUser, deleteUser} = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/',auth,getAllUsers)
router.get('/:id',auth,getSingleUser)
router.patch('/:id',auth,updateUser)
router.delete('/:id',auth,deleteUser)

module.exports = router