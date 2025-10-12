
import vehicleService from "../service/vehicle.service.js"

class VehicleController {
  submitVehicleForm = async (req, res) => {
    try {
      const data = req.body
      const vehicle = await vehicleService.createVehicle(data)
      if(vehicle.status === 'error') {
        return res.status(400).json(vehicle)
      } 
      res.status(201).json(vehicle)  
    } catch (error) {
      res.status(500).json({ status: 'error' , message:"something went wrong" } )
    }
  }
}
export default new VehicleController()

      