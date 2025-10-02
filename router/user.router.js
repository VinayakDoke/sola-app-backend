import express from 'express'
import userController from '../controller/user.controller.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('User route is working.')
})
router.post('/register', userController.registerUser)
router.post('/login', (req, res) => {
  res.send('User login endpoint.')
})

export default router