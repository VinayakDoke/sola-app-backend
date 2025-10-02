import contactService from "../service/contact.service.js"

class contactController {
  submitContactForm = async (req, res) => {
    try {
      const { name, email, phone, message } = req.body
      const user = await contactService.createContact(name.trim(), email.trim(), phone.trim(), message.trim())
      if(user.status === 'error') {
        return res.status(400).json(user)
      } 
      res.status(201).json(user)  
    } catch (error) {
      res.status(500).json({ status: 'error' , message:"something went wrong" } )
    }
  }
}
export default new contactController()
