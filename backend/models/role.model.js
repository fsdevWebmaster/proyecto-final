// Role.js

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({

    code: {
      type: Number,
      required: true,
      unique: true,
    },
    name:{
      type: String,
      required: true
    },
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
      ret.id = doc.id
      return ret
    }

  }  
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
