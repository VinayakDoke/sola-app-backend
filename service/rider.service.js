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

  getRiderByVenderId = async vender_id => {
    try {
      const riders = await Rider.findAll({ where: { vender_id } })
      return { status: 'success', riders }
    } catch (err) {
      console.log(err)
      return { status: 'error', message: 'Failed to fetch riders' }
    }
  }
  getRiderByVenderId = async vender_id => {
    try {
      const riders = await Rider.findAll({ where: { vender_id } })
      return { status: 'success', riders }
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

    //      "status": "success",
    // "message": "Rider updated successfully",
    // "user": {
    //     "passport_photo": "passport_photo-1760283922602-617200413.webp",
    //     "adhar_photo": "adhar_photo-1760283922603-340966562.png",
    //     "driving_license_photo": "driving_license_photo-1760283922614-946391133.png"
    // }

      const result = await Rider.update({
        pic: data.passport_photo,
        adhar_photo: data.adhar_photo,
        driving_licence_photo: data.driving_license_photo
    }, { where: { id: id } })
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
