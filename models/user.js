const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  accountOwner:{ //referance
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  }
});

let User = module.exports = mongoose.model("User", userSchema);
