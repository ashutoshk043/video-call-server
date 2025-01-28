const crypto = require('../middlewares/crypto')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken');



const loginWithGoogle = async (req, res) => {
    try {
      const email =req.body.email

      const user = await UserModel.findOne({email:email});
      let registerUser;

      if(!user){
        // registerUser
        const userDetails = {
          email:req.body.email,
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          socialLogin:true,
          photoUrl: "assets/images/user_profile.png"
        }

        registerUser = await UserModel.create(userDetails);
      }else{
        registerUser = user
      }

      const token = createJWTToken({
        id: registerUser._id,
        email: registerUser.email,
        role: registerUser.userType,
        firstName:registerUser.firstName,
        lastName:registerUser.lastName,
        photoUrl:registerUser.photoUrl
      })

      const finalData = {
        status:true,
        token:token,
        message:"Login successfully"
      }
  
      // Encrypt the request body using the encode function
      const encData = await crypto.encode(finalData);
  
      // Send the encrypted data in the response
      res.status(200).send({ data: encData });
    } catch (error) {
      console.error("Error in loginWithGoogle:", error.message);
      // Send an error response
      res.status(500).send({ message: "Encryption failed", error: error.message });
    }
  };


  const createJWTToken = (payload)=> {
    try {
      // Generate the token
      const secretKey = process.env.JWT_SECRET_KEY
      const token = jwt.sign(payload, secretKey, { expiresIn : '8h' });
      return token;
    } catch (error) {
      console.error('Error creating JWT token:', error);
      throw new Error('Token creation failed');
    }
  }


module.exports = {loginWithGoogle}