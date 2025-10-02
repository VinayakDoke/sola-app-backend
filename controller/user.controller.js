import userService from "../service/user.service.js"

class UserController {
  registerUser = async (req, res) => {
    try {
      const { fullName, email, mobile, password } = req.body
      const name = fullName.trim()
      const user = await userService.createUser(name, email.trim(), mobile.trim(), password.trim())
      if(user.status === 'error') {
        return res.status(400).json(user)
      } 
      res.status(201).json(user)  
    } catch (error) {
      res.status(500).json({ status: 'error', message:"something went wrong" } )
    }
  }
}
export default new UserController()
