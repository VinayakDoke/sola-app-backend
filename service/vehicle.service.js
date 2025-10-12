import  Vehicle  from "../module/Vehicle.js"

class VehicleService {
  createVehicle = async data => {
    try {
      const result = await Vehicle.create(data)
      return {
        status: 'success',
        message: 'Vehicle registered successfully',
        user: result
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Vehicle registration failed' }
    }
  }
}

export default new VehicleService()
