const mongoose = require('mongoose');

//bringing the class
const EnsClass = require('../classes/ens.js')

//bringing models
const Person = require('./person.js');

// ens schema
let ensSchema = mongoose.Schema({
  grade: {
    type: String,
    required: true
  },
  teaching:[
    {
      subjectId: String, // ex: IGL
      publishedCourses:[{type: mongoose.Schema.Types.ObjectId , ref:'Course'}],
      groupsIds: [String] // ex: 1CS1
    }
  ]
},
{
  discriminatorKey: 'kind'
});
ensSchema.loadClass(EnsClass);

let Ens = module.exports = Person.discriminator('Ens',ensSchema);
