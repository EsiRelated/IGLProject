
const mongoose = require('mongoose');
const CourseClass = require('../classes/course.js');
//course Schema

let courseSchema = mongoose.Schema({
  ensName:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  courseFile:{ // to change
    type: String,
    required: true
  }
});
courseSchema.loadClass(CourseClass);

module.exports = courseSchema
