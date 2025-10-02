import express from 'express'
import contactController from '../controller/contact.controller.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Contact route is working.')
})
router.post('/', contactController.submitContactForm)


export default router