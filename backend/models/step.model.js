// Step.js

import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  previous: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Step",
  },
  next: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Step",
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
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

const Step = mongoose.model('Step', stepSchema);

export default Step;
