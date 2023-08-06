// Journey.js

import mongoose from 'mongoose';


const journeySchema = new mongoose.Schema({
  journeyId: {
    type: String,
    required: true,
    unique: true,
  },

});

const Container = mongoose.model('Journey', journeySchema);

export default Journey;
