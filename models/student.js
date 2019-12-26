const mongoose = require('mongoose');

//bringing the class
const StudentClass = require('../classes/student.js')

//bringing models
const Person = require('./person.js');

// student schema
let studentSchema = mongoose.Schema({
  group: {
    type: String, // could be used as a referance
    required: true
  },
  allWorks:[
    {
      subject: String, //used as a referance
      works:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Work'
      }]
    }
  ]
},
{
  discriminatorKey: 'kind'
});
studentSchema.loadClass(StudentClass);

studentSchema.virtual('nivId').get(function () {
  return this.group.slice(0,3);
});

let Student = module.exports = Person.discriminator('Student',studentSchema);
