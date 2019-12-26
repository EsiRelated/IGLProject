const mongoose = require('mongoose');

//work Schema

let work = mongoose.Schema({
  publisher:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  workFile: {
    type: String, // to change to file
    required: true
  }
});


let Work = module.exports = mongoose.model('Work',groupSchema);
