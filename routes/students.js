const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const ensureAuthenticated = require('../public/js/ensureAuthenticated.js')

// bringing models
let User = require('../models/user.js');
let Niv = require('../models/niv.js');
let Student = require('../models/student.js')

router.get('/courses', ensureAuthenticated, ensureStudentType, function(req, res){
  // req.user is logged in and is a student
  Niv.findOne({nivId: req.user.accountOwner.nivId}).populate('subjects').exec(function (err, niv) {
    if(err){
      console.log(err)
    } else {
      if (niv) {
        res.render('subjectsView', {
          user: req.user,
          subjects: niv.subjects
        });
      } else { // user.accountOwner.nivId not in database
        req.flash('danger','something went wrong')
        res.redirect('/users/'+req.user.username)
      }
    }
  });
});

// Ensures that only students can access thier courses
function ensureStudentType(req, res, next) {
  if (req.user.accountOwner instanceof Student)
    next();
  else {
    req.flash('danger','you can not do that buddy');
    res.redirect('/users/'+req.user.username);
  }
}

module.exports = router;
