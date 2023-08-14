// Driver.js

import mongoose from 'mongoose';
//Revisar la importacion de extendSchema y la funcionalidad. heredar los atributos de los otros modelos 
//g3puMlDnyjMonOTo
const driverSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
      unique: true,
    },
    idDoc: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
} );

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
