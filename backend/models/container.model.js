// Container.js
import mongoose from 'mongoose';

const containerSchema = new mongoose.Schema({
  containerNumber: {
    type: String,
    required: true,
    unique: true,
  }
});

const Container = mongoose.model('Container', containerSchema);

export default Container;
