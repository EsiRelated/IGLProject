const mongoose = require('mongoose');
const path = require('path');
const courseSchema = require('./courseSchema.js');
// courses list schema

let coursesListSchema = mongoose.Schema({
  nivId:{
    type: String,
    required: true
  },
  groupId:{
    type: Number,
    required: true
  },
  subjectId:{
    type: String,
    required: true
  },
  courses:[courseSchema]
});

let CoursesList = module.exports = mongoose.model('CoursesList', coursesListSchema);
