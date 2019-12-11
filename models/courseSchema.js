
const mongoose = require('mongoose');
const CourseClass = require('../classes/course.js');
//course Schema

let courseSchema = mongoose.Schema({
  publisher:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ens',
    required: true
  },
  subject:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
   },
  courseFile:{
    type: String,
    required: true
  }
});
courseSchema.loadClass(CourseClass);

module.exports = courseSchema
