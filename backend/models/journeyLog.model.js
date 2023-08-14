// JourneyLog.js

import mongoose from 'mongoose';

const journeyLogSchema = new mongoose.Schema({
    
    step:{
        type: String,
        required: true
    },
    stepValue: {
      type: String | Number | Boolean  ,
      required: true
    },
    journeyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journey"
    }
}, {
    timestamps: true
} );

const Journey = mongoose.model('JourneyLog', journeyLogSchema);

export default Journey;
