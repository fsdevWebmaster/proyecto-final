// Journey.js

import mongoose from 'mongoose';
const extendSchema = require('mongoose-extend-schema');

//Revisar la importacion de extendSchema y la funcionalidad. heredar los atributos de los otros modelos 
const journeySchema = extendSchema(containerSchema, {

    journeyId: {
      type: String,
      required: true,
      unique: true,
    },
    date:{
      type: date,
      required: true
    }
} );

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;
