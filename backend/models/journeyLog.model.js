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

} );

const JourneyLog = mongoose.model('JourneyLog', journeyLogSchema);

export default JourneyLog;

