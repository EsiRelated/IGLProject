const mongoose = require('mongoose');
const SubjectClass = require('../classes/subject.js');

//subject Schema

let subjectSchema = mongoose.Schema({
  subjectId:{
    type: String,
    required: true
  },
  coef:{
    type: Number,
    required: true
  },
  credit:{
    type: Number,
    required: true
  }
});

subjectSchema.loadClass(SubjectClass);

module.exports = subjectSchema;
