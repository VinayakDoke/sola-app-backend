import Rider from '../module/Rider.js'

class RiderService {
  createRider = async data => {
    try {
      const result = await Rider.create(data)
      return {
        status: 'success',
        message: 'Rider registered successfully',
        user: result
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Rider registration failed' }
    }
  }

  updateRider = async (data, id) => {
    try {
      const result = await Rider.update(data, { where: { id: id } })
      return {
        status: 'success',
        message: 'Rider updated successfully',
        user: result
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Rider update failed' }
    }
  }

  // getRiderByVenderId = async vender_id => {
  //   try {
  //     const riders = await Rider.findAll({ where: { vender_id } })
  //     return { status: 'success', riders }
  //   } catch (err) {
  //     console.log(err)
  //     return { status: 'error', message: 'Failed to fetch riders' }
  //   }
  // }
  getRiderByVenderId = async vender_id => {
    try {
      const riders = await Rider.findAll({ where: { vender_id } })
      return { status: 'success', riders:riders ,message:'riders fetched successfully'}
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Failed to fetch riders' }
    }
  }

  getRiderById = async id => {
    try {
      const rider = await Rider.findOne({ where: { id } })
      return { status: 'success', rider }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Failed to fetch rider' }
    }
  }
  updateRiderCertificate = async (data, id) => {
    try {
     
      const result = await Rider.update(
        {
          pic: data.passport_photo,
          adhar_photo: data.adhar_photo,
          driving_licence_photo: data.driving_license_photo
        },
        { where: { id: id }, logging: console.log },
        
      )
      return {
        status: 'success',
        message: 'Rider updated successfully',
        user: data
      }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Rider update failed' }
    }
  }
}

export default new RiderService()
