import { sequelize } from '../module/index.js'
import Profile from '../module/Profile.js'
import User from '../module/User.js'
import bcrypt from 'bcrypt'

class UserService {
  getUser () {}
  async createUser (name, email, mobile, password) {
    let t
    try {
      t = await sequelize.transaction() // Start transaction

      // Check for existing email
      const existingUser = await Profile.findOne({
        where: { email },
        transaction: t
      })
      if (existingUser) {
        return { status: 'error', message: 'Email already exists' }
      }

      // Check for existing mobile
      const existingMobile = await Profile.findOne({
        where: { mobile },
        transaction: t
      })
      if (existingMobile) {
        return { status: 'error', message: 'Mobile already exists' }
      }

      // Create Profile
      const profile = await Profile.create(
        { name, email, mobile },
        { transaction: t }
      )

      // Hash password
      const bcryptPassword = await bcrypt.hash(password, 10)

      // Create User
      const user = await User.create(
        {
          name,
          email,
          username: email,
          password: bcryptPassword,
          profile_id: profile.id
        },
        { transaction: t }
      )

      await t.commit()
    //   return { profile, user }
      return { status: 'success', message: 'User registered successfully', user: { name: profile.name, email: profile.email } }
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

  async findUserByEmailTOAuth(email) {
    try {
      return await User.scope("withPassword").findOne({ where: { email } })
    } catch (error) {
      console.error('Error finding user by email:', error)
      throw error
    }
  }
 
}
export default new UserService()
