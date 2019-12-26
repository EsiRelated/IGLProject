
const mongoose = require('mongoose');
const Subject = require('./subject.js');

let nivSchema = new mongoose.Schema({ // loaded when a student is loged in to get subjects
  nivId: { // ex: 1CS
    type: String,
    required: true
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Subject'
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Group'
  }]

});

let Niv = module.exports = mongoose.model('Niv',nivSchema);
