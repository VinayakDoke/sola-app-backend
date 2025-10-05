import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'
import userService from '../service/user.service.js'

class authController {
 login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userService.findUserByEmailTOAuth(email)
   
    if (!user) return res.status(404).json({ status : 'fail', message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
      return res.status(400).json({ status : 'fail', message: 'Invalid credentials' })
    }
    // Generate JWT
    let jwtContent = { id: user.id, email: user.email, name: user.name }
    const token = generateToken(
      jwtContent,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    )
    const refresh_token = generateToken(
      jwtContent,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN
    )
    res.cookie('access_token', token, {
      httpOnly: true, // prevents client-side access
      secure: process.env.NODE_ENV === 'production', // only send over HTTPS
      sameSite: 'strict', // prevents CSRF
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true, // prevents client-side access
      secure: process.env.NODE_ENV === 'production', // only send over HTTPS
      sameSite: 'strict', // prevents CSRF
      maxAge: 1 * 60 * 60 * 1000 // 1 hour
    })

    return res.status(200).json({
      message: 'Login successful',
      status : 'success',
      user: { name: user.name, email: user.email }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({  status : 'fail',message: error.message })
  }
}
}
export default new authController()