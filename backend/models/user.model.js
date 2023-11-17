// User.js
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
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
  }],
  token: {
    type: String,
  }  
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v
      delete ret.password
      delete ret.token
      delete ret._id
      ret.id = doc.id
      return ret
    }
  }
});

const User = mongoose.model('User', userSchema);

export default User;
