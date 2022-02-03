const mongoose = require('mongoose');

const { Schema } = mongoose;

const proseSchema = new Schema({

  link: { type: String, required: true },
  sentences: [{
    type: String,
  }],
  _id: { type: Number, required: true },

});

export const Prose = mongoose.model('Prose', proseSchema);
