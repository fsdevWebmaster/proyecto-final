// steo.model.js

import mongoose, { Schema } from 'mongoose';

const stepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  previous: {
    type: Schema.Types.ObjectId,
    ref: "Step"
  },
  next: {
    type: Schema.Types.ObjectId,
    ref: "Step"
  }
} );

const Step = mongoose.model('Step', stepSchema);

export default Step;
