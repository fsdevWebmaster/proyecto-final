// Reason.js

import mongoose from 'mongoose';

const reasonStatusSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"    
    },
    status: {
      type: String,
      enum: ['In transit', 'In charge', 'In discharge', 'On Hold', 'Approved', 'Canceled'],
      required: true
    },
    description: {
      type: String
    }
} );

const Reason = mongoose.model('Reason', reasonStatusSchema);

export default Reason;
