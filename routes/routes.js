const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const crypto = require('../middlewares/crypto')


router.post('/user/login-google',crypto.decode, userController.loginWithGoogle)



module.exports = router