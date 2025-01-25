const crypto = require('../middlewares/crypto')
const UserModel = require('../models/user')
const {generateIcon} = require('../common/createProfileIcons')



const loginWithGoogle = async (req, res) => {
    try {
      const email =req.body.email
      const value = email
      const size = 200
      const filePath = '../profiles'

      const user = await UserModel.findOne({email:email});
      const profile =  generateIcon(value, size, filePath)

      if(!user){
        // registerUser
        const userDetails = {
          email:req.body.email,
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          socialLogin:true,
          photoUrl: profile
        }
        console.log(userDetails, "userDetails")
      }



      console.log(req.body, "Data received in controller");
  
      // Encrypt the request body using the encode function
      const encData = await crypto.encode(req.body);
  
      // Send the encrypted data in the response
      res.status(200).send({ data: encData });
    } catch (error) {
      console.error("Error in loginWithGoogle:", error.message);
  
      // Send an error response
      res.status(500).send({ message: "Encryption failed", error: error.message });
    }
  };


module.exports = {loginWithGoogle}