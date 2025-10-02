import ContactLead from '../module/ContactLead.js'
import { sequelize } from '../module/index.js'
import Profile from '../module/Profile.js'
import User from '../module/User.js'
import bcrypt from 'bcrypt'

class contactService {
  getUser () {}
  async createContact (name, email, mobile, message) {
    let t
    try {
      t = await sequelize.transaction() // Start transaction

      const contactLead = await ContactLead.create(
        { name, email, mobile ,message},
        { transaction: t }
      )

      await t.commit()
      return { status: 'success', message: 'Thank you for contacting us! Your message has been received.', user: {  } }
    } catch (error) {
      console.error('Transaction error:', error)

      // Only rollback if transaction exists
      if (t) {
        try {
          await t.rollback()
          console.log('Transaction rolled back successfully')
        } catch (rollbackError) {
          console.error('Rollback failed:', rollbackError)
        }
      }

      return { status: 'error', message: 'something went wrong' }
    }
  }

  updateUser (userId, userData) {
    // Logic to update user information
  }
}
export default new contactService()
