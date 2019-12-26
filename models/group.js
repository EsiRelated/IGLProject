const mongoose = require('mongoose');

//group Schema

let groupSchema = mongoose.Schema({
  groupId:{ //ex: 1CS1 // might also be used as a referece to Niv
    type: String,
    required: true,
    unique: true
  },
  coursesLists:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseList',
  }],
  studentIds:[{type: String}] // ex: 17/0231
});

// niv as a virtual
groupSchema.virtual('nivId').
  get(function(){return this.groupId.substr(0,3)}).
  set(function(v){this.groupId = v + this.groupId.substr(3)});

let Group = module.exports = mongoose.model('Group',groupSchema);
