// JourneyLog.js

import mongoose, { Schema } from 'mongoose';
import Step from './step.model.js';
import Reason from './reasonStatus.model.js';

const journeyLogSchema = new mongoose.Schema({
  step: {
    type: Schema.Types.ObjectId,
    ref: "Step",
    required: true
  },
  stepValue: {
    type: Schema.Types.Mixed,
    required: true
  },
  journeyId: {
    type: Schema.Types.ObjectId,
    ref: "Journey",
    required: true
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "Status",
    required: true
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals:true,
    transform: function(doc, ret, options) {
      ret.id = doc._id
      delete ret.__v
      delete ret.createdAt
      delete ret.updatedAt
      delete ret._id
      return ret
    }
  }
})

const JourneyLog = mongoose.model('JourneyLog', journeyLogSchema);

export default JourneyLog;
