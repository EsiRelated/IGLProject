const mongoose = require('mongoose');
const courseSchema = require('./courseSchema.js');

let Course = module.exports = mongoose.model('Course',courseSchema);
