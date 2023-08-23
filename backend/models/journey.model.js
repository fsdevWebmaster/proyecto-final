// Journey.js

import mongoose from 'mongoose';
const journeySchema = new mongoose.Schema({

    entryDate:{
      type: Date,
      required: true
    },
    driver:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver"
    },
    container:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container"
    },
    status:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reason"
    },
    dateOut:{
      type: Date,
    },
}, {
  toJSON: {
    virtuals: true,
    transform: ((doc, ret) => {
      delete ret.__v
      delete ret._id
      ret.id = doc._id
      return ret
    })
  }
} );

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;
