const mongoose = require('mongoose');
const PersonClass = require('../classes/person.js');

//person Schema
let personSchema = mongoose.Schema({
  personId:{
    type: String,
    required: true,
    unique: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  bDay: {
    type: Date,
    required: true
  }
},
{
  discriminatorKey: 'kind'
});

personSchema.loadClass(PersonClass);

personSchema.virtual('fullName').get(function () {
  return this.fName + ' ' + this.lName;
});

let Person = module.exports = mongoose.model('Person', personSchema);
