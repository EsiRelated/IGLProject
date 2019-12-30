const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
// bringing models
let User = require('../models/user.js');
let Ens = require('../models/ens.js');
let Student = require('../models/student.js');

// data to test
/*let userEns = new User({
  username:"ens1",
  email:"ens1@esi.dz",
  password:"1234",
  accountOwner: "5df0defae339f51fa46fc169"
});
bcryptjs.genSalt(10,function(err, salt){
  bcryptjs.hash(userEns.password, salt, function(err, hash){
    if(err){
      console.log(err);
    }else{
      userEns.password = hash;
      userEns.save(function(err){
        if(err)
          console.log(err)
      });
    }
  });
})

let userStudent = new User({
  username:"student1",
  email:"student1@esi.dz",
  password:"1234",
  accountOwner:"5dffa0092ecfcd177154b28d"
});
bcryptjs.genSalt(10,function(err, salt){
  bcryptjs.hash(userStudent.password, salt, function(err, hash){
    if(err){
      console.log(err);
    }else{
      userStudent.password = hash;
      userStudent.save();
    }
  });
})
*/


// login page
router.get('/login', function(req, res){
  res.render('login');
});


// login process
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    } else if(!user){
      req.flash('danger',info.message)
      return res.redirect('/users/login');
    }
    req.logIn(user, function(err){
      if(err){
        return next(err);
      } else {
        req.flash('success','logged in as a ' + user.accountOwner.kind)
        return res.redirect('/users/' +user.username);
      }
    });
  })(req, res, next);
});

// logout process
router.get('/logout', function(req, res, next){
  req.logout();
  req.flash('success', 'you are logged out')
  res.redirect('/users/login');
});


// profile route
router.get('/:username', function(req, res, next){
  User.findOne({username:req.params.username}).populate('accountOwner').exec(function(err, doc){
    if(err){
      console.log(err)
    } else {
        if (doc) {
          res.render('userProfile',{
            wantedUser: doc,
            Student: Student,
            Ens: Ens
          });
        } else {
            console.log("here")
            req.flash('danger','No such user')
            res.redirect('/')
          }
        }
  });
});

module.exports = router;
