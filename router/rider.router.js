import express from 'express'
import riderController from '../controller/rider.controller.js'
import upload from '../middleware/upload.js'
const router = express.Router()

router.get('/', riderController.getRidersByVenderId)

router.get('/:id', riderController.getRiderById)
router.post('/', riderController.submitRiderForm)
router.put('/:id', riderController.updateRider)

router.post('/upload', upload.fields([
    { name: 'passport_photo', maxCount: 1 },
    { name: 'adhar_photo', maxCount: 1 },
    { name: 'driving_license_photo', maxCount: 1 }
  ]), riderController.updateRiderCertificate);

// (req, res) => {
//   if (!req.file) return res.status(400).send('No file uploaded.');
//   res.send(`File uploaded successfully: ${req.file.filename}`);
// }

export default router