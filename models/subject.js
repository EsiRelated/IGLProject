const mongoose = require('mongoose');

// subject schema

let subjectSchema = mongoose.Schema({
  niv: { // might be usefull in validating Ens.teaching.groupsIds 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niv'
  },
  subjectId: {
    type: String,
    required: true
  },
  fullName:{
    type: String,
    required: true
  },
  coef: {
    type: Number,
    required: true
  },
  credit: {
    type: Number,
    required: true
  },
});

let Subject = module.exports = mongoose.model('Subject', subjectSchema);
