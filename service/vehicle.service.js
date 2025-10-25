import Vehicle from '../module/Vehicle.js'

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
  getVehicleByVendor = async vendor_id => {
    try {
      const result = await Vehicle.findAll({ where: { vendor_id } })
      return {
        status: 'success',
        data: result,
        message: 'vehicle fetched successfully'
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Failed to fetch vehicle' }
    }
  }
  getVehicleById = async id => {
    try {
      const res = await Vehicle.findOne({ where: { id } })
      return { status: 'success', data: res }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Failed to fetch vehicle' }
    }
  }
  updateVehicle = async (data, id) => {
    try {
      const result = await Vehicle.update(data, { where: { id: id } })
      return {
        status: 'success',
        message: 'Vehicle updated successfully',
        user: result
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Vehicle update failed' }
    }
  }

  updateVehicleCertificate = async (data, id) => {
    try {
      const result = await Vehicle.update(
        {
          rc_pic: data?.rc_photo,
          puc_pic: data?.puc_photo,
          fitness_certificate_pic: data?.fitness_certificate_photo,
          insurance_pic: data?.vehicle_insurance_photo,
          veh_pic: data?.vehicle_picture,
          veh_pic1: data?.vehicle_picture1,
          veh_pic2: data?.vehicle_picture2,
          veh_pic3: data?.vehicle_picture3,
          veh_pic4:  data?.vehicle_picture4
        },
        { where: { id: id } }
      )
      return {
        status: 'success',
        message: 'Vehicle updated successfully',
        user: data
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Vehicle update failed' }
    }
  }
  updateRegistrationStatus = async id => {
    try {
      const data = await Vehicle.findByPk(id)
      if (!data?.rc_pic) {
        return { status: 'error', message: 'RC Book Copy is required' }
      }
      if (!data?.puc_pic) {
        return { status: 'error', message: 'PUC Certificate is required' }
      }
      if (!data?.insurance_pic) {
        return { status: 'error', message: 'Vehicle Insurance is required' }
      }
       if (!data?.veh_pic) {
        return { status: 'error', message: 'Vehicle Picture Front is required' }
      }
      if (!data?.veh_pic1) {
        return { status: 'error', message: 'Vehicle Picture Back is required' }
      } 
      if (!data?.veh_pic2) {
        return { status: 'error', message: 'Vehicle Picture Left is required' }
      }
      if (!data?.veh_pic3) {
        return { status: 'error', message: 'Vehicle Picture Right is required' }
      }
       if (!data?.veh_pic4) {
        return { status: 'error', message: 'Vehicle Picture Internal is required' }
      }

      await Vehicle.update(
        {
          registration_status: 1
        },
        { where: { id: id }, logging: console.log }
      )

      return {
        status: 'success',
        message: 'Vehicle updated successfully',
        user: []
      }
    } catch (error) {
      console.log(error)
      return { status: 'error', message: 'Vehicle update failed' }
    }
  }
}

export default new VehicleService()
