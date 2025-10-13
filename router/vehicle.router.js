import express from 'express'
import vehicleController from '../controller/vehicle.controller.js'
import upload from '../middleware/upload.js'
const router = express.Router()

router.get('/', vehicleController.getVehicleByVendor)
router.post('/', vehicleController.submitVehicleForm)
router.get('/:id', vehicleController.getVehicleById)
router.put('/:id', vehicleController.updateVehicle)
router.post('/upload', upload.fields([
    { name: 'rc_photo', maxCount: 1 },
    { name: 'puc_photo', maxCount: 1 },
    { name: 'fitness_certificate_photo', maxCount: 1 },
    
    { name: 'vehicle_insurance_photo', maxCount: 1 },
    { name: 'vehicle_picture', maxCount: 1 },
    { name: 'vehicle_picture1', maxCount: 1 },
    
    { name: 'vehicle_picture2', maxCount: 1 },
    { name: 'vehicle_picture3', maxCount: 1 },
    { name: 'vehicle_picture4', maxCount: 1 }
  ]), vehicleController.updateVehicleCertificate);
export default router