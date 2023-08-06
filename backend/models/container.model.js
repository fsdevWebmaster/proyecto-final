// Container.js

//const mongoose = require('mongoose');
import mongoose from 'mongoose';


const containerSchema = new mongoose.Schema({
  containerNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['In transit', 'In charge', 'In discharge', 'Returned'],
    default: 'In transit',
  },
});

const Container = mongoose.model('Container', containerSchema);

//module.exports = Container;
export default Container;
