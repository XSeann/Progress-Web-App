const express = require('express')

// controller functions
const { loginUser, signupUser, getUsers, deleteUser, updateUser } = require('../controller/userController')

const router = express.Router()

router.get('/users', getUsers)
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

module.exports = router