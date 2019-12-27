const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');
const config = require('../config/database');
const bcryptjs = require('bcryptjs');


module.exports = function(passport){
  // local Strategy
  passport.use(new localStrategy(function(username, password, done){
    // match username
    let query = {username:username};
    User.findOne(query).populate('accountOwner').exec(function(err, user){
      if(err) throw err;
      if(!user) {
        return done(null, false, {message:"user not found"});
      }

      // match password
      bcryptjs.compare(password, user.password, function(err, isMatch){
        if(!isMatch){
          return done(null, false, {message:"wrong password"});
        } else {
          return done(null, user);
        }
      });
    });
  }));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).populate('accountOwner').exec(function(err, user) {
      done(err, user);
    });
  });
}
