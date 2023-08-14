// Journey.js

import mongoose from 'mongoose';
//Revisar la importacion de extendSchema y la funcionalidad. heredar los atributos de los otros modelos 
//g3puMlDnyjMonOTo
const journeySchema = new mongoose.Schema({

    entryDate:{
      type: date,
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
      type: date,
      required: true
    },
} );

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;
