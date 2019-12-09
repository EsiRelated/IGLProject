
const mongoose = require('mongoose');
const SubjectSchema = require('./subjectSchema.js');

let nivSchema = new mongoose.Schema({
  nivId:{
    type: String,
    required: true
  },
  subjects:[SubjectSchema]
});

let Niv = module.exports = mongoose.model('Niv',nivSchema);
