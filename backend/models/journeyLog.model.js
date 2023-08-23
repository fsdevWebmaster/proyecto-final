// JourneyLog.js

import mongoose, { Schema } from 'mongoose';

const journeyLogSchema = new mongoose.Schema({
  step: {
    type: String,
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
  }
}, {
  timestamps: true
})

const JourneyLog = mongoose.model('JourneyLog', journeyLogSchema);

export default JourneyLog;
