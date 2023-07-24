// Container.js

const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
  numeroContenedor: {
    type: String,
    required: true,
    unique: true,
  },
  estatus: {
    type: String,
    enum: ['En transito', 'En carga', 'En descarga', 'Devuelto'],
    default: 'En transito',
  },
});

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;
