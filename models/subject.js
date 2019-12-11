const mongoose = require('mongoose');

// subject schema

let subjectSchema = mongoose.Schema({
  niv: { // might be usefull in validating Ens.teaching.groupsIds
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  fullName:{
    type: String,
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
