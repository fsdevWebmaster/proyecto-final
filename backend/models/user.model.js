// User.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idDoc: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }]
});

const User = mongoose.model('User', userSchema);

// module.exports = User;
export default User;
