const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: function () {
      return !this.socialLogin; // If social login is used, password is not required
    },
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  socialLogin: {
    type: Boolean,
    default: false,
  },
  photoUrl: {
    type: String,
    default: null,
  },
  userType: {
    type: String,
    enum: ['admin', 'user', 'guest'], // Allowed types
    default: 'user',
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('User', userSchema);
