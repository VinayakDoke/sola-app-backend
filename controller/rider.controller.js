import riderService from '../service/rider.service.js'
import { dateToIST } from '../utils/helper.js'

class RiderController {
  submitRiderForm = async (req, res) => {
    try {
      const data = req.body
      data.date_of_birth = dateToIST(data.date_of_birth)
      data.driving_license_expiry = dateToIST(data.driving_license_expiry)
      const user = req.user
      data.vender_id = user.id
      const result = await riderService.createRider(data)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
  getRidersByVenderId = async (req, res) => {
    try {
      const user = req.user
      const vender_id = user.id
      const result = await riderService.getRiderByVenderId(vender_id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }

  getRiderById = async (req, res) => {
    try {
      const { id } = req.params
      const result = await riderService.getRiderById(id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
  updateRider = async (req, res) => {
    try {
      const data = req.body
      data.date_of_birth = dateToIST(data.date_of_birth)
      data.driving_license_expiry = dateToIST(data.driving_license_expiry)
      const { id } = req.params
      const result = await riderService.updateRider(data, id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
  updateRiderCertificate = async (req, res) => {
    try { 
      const { id } = req.body
      const uploaded = {}
      for (const key in req.files) {
        uploaded[key] = req.files[key][0].filename
      }
      const result = await riderService.updateRiderCertificate(uploaded, id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
}
export default new RiderController()
