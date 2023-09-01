// Reason.js

import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"    
    },
    status: {
      type: String,
      enum: ['On Hold', 'On transit', 'On load', 'On unload', 'Approved', 'Canceled'],
      required: true
    },
    description: {
      type: String
    }
} );

const Status = mongoose.model('Status', statusSchema);

export default Status;
