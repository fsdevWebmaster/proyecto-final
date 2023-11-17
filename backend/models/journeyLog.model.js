// JourneyLog.js

import mongoose, { Schema } from 'mongoose';
import Step from './step.model.js';

const journeyLogSchema = new mongoose.Schema({

  journey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journey',
    required: true
  },
  step: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step',
    required: true
  },
  stepValue: {
    type: mongoose.Schema.Types.Mixed
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  }

}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
} );

const JourneyLog = mongoose.model('JourneyLog', journeyLogSchema);

export default JourneyLog;

