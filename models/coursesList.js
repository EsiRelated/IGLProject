const mongoose = require('mongoose');
const path = require('path');
const courseSchema = require('./courseSchema.js');

// courses list schema
let coursesListSchema = mongoose.Schema({
  groupId:{ // ex: 1CS1
    type: String,
    required: true
  },
  subjectId:{
    type: String,
    required: true
  },
  courses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

let CoursesList = module.exports = mongoose.model('CoursesList', coursesListSchema);
