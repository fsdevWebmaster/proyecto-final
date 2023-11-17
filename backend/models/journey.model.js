// Journey.js

import mongoose from "mongoose"

const journeySchema = new mongoose.Schema({

  driver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true
  },
  driverDoc: {
    type: String
  },
  container:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Container",
    required: true
  },
  containerNumber: {
    type: String
  },
  step:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Step"
  },
  status:{
    type: String,
    enum: ['ON_HOLD', 'IN_PROGRESS', 'DONE', 'DECLINED'],
    default: "ON_HOLD"
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: ((doc, ret) => {
      delete ret.__v
      delete ret._id
      ret.id = doc._id
      return ret
    })
  }
})

const Journey = mongoose.model("Journey", journeySchema)

export default Journey

