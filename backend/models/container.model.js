// Container.js
import mongoose from 'mongoose';

const containerSchema = new mongoose.Schema({
  containerNumber: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
      ret.id = doc._id
      return ret
    }
  }
});

const Container = mongoose.model('Container', containerSchema);

export default Container;
