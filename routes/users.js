const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// bringing models
let User = require('../models/user.js');
let Ens = require('../models/ens.js');
let Student = require('../models/student.js');

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
  console.log("in route: " + req.user)
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
