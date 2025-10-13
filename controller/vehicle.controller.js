import vehicleService from '../service/vehicle.service.js'
import { dateToIST } from '../utils/helper.js'

class VehicleController {
  submitVehicleForm = async (req, res) => {
    try {
      const data = req.body
      data.vendor_id = req.user.id
      data.model = data.vehicle_model
      data.rc_no = data.registration_certificate_no
      data.type = data.vehicle_category
      data.insurance = data.vehicle_insurance_no

      data.rc_date_from = dateToIST(data.rc_valid_from)
      data.rc_date_upto = dateToIST(data.rc_valid_to)
      data.puc_date_from = dateToIST(data.puc_valid_from)
      data.puc_date_to = dateToIST(data.puc_valid_to)
      data.insurance_from = dateToIST(data.vehicle_insurance_valid_from)
      data.insurance_to = dateToIST(data.vehicle_insurance_valid_to)

      data.fitness_certicate_from = data.fitness_valid_from
        ? dateToIST(data.fitness_valid_from)
        : null
      data.fitness_certicate_to = data.fitness_valid_to
        ? dateToIST(data.fitness_valid_to)
        : null

      const vehicle = await vehicleService.createVehicle(data)
      if (vehicle.status === 'error') {
        return res.status(400).json(vehicle)
      }
      res.status(201).json(vehicle)
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
  getVehicleByVendor = async (req, res) => {
    try {
      const user = req.user
      const vendor_id = user.id
      const result = await vehicleService.getVehicleByVendor(vendor_id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
  getVehicleById = async (req, res) => {
    try {
      const { id } = req.params
      const result = await vehicleService.getVehicleById(id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
  updateVehicle = async (req, res) => {
    try {
      const data = req.body
      data.model = data.vehicle_model
      data.rc_no = data.registration_certificate_no
      data.type = data.vehicle_category
      data.insurance = data.vehicle_insurance_no
      data.rc_date_from = dateToIST(data.rc_valid_from)
      data.rc_date_upto = dateToIST(data.rc_valid_to)
      data.puc_date_from = dateToIST(data.puc_valid_from)
      data.puc_date_to = dateToIST(data.puc_valid_to)
      data.insurance_from = dateToIST(data.vehicle_insurance_valid_from)
      data.insurance_to = dateToIST(data.vehicle_insurance_valid_to)

      data.fitness_certicate_from = data.fitness_valid_from
        ? dateToIST(data.fitness_valid_from)
        : null
      data.fitness_certicate_to = data.fitness_valid_to
        ? dateToIST(data.fitness_valid_to)
        : null

      const { id } = req.params
      const result = await vehicleService.updateVehicle(data, id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }

  updateVehicleCertificate = async (req, res) => {
    try {
      const { id } = req.body
      const uploaded = {}
      for (const key in req.files) {
        uploaded[key] = req.files[key][0].filename
      }
      const result = await vehicleService.updateVehicleCertificate(uploaded, id)
      if (result.status === 'error') {
        return res.status(400).json(result)
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'something went wrong' })
    }
  }
}
export default new VehicleController()
