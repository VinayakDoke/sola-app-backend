import express from 'express'
import vehicleController from '../controller/vehicle.controller.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Vehicle route is working.')
})
router.post('/', vehicleController.submitVehicleForm)


export default router