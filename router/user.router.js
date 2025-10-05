import express from 'express'
import userController from '../controller/user.controller.js'
import authController from '../controller/auth.controller.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('User route is working.')
})
router.post('/register', userController.registerUser)
router.post('/login', authController.login)

export default router