const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// bringing models
let CoursesList = require('../models/coursesList.js');
let Course = require('../models/course.js');
let User = require('../models/user.js');
let Niv = require('../models/niv.js');


router.get('/:username/courses', function(req, res){
  User.findOne({username: req.params.username}).populate('accountOwner').exec(function(err, user){
    if(err){
      console.log(err);
    } else if (user._id.toString() == req.user._id.toString()){
      Niv.findOne({nivId: user.accountOwner.nivId}).populate('subjects').exec(function (err, nivFound) {
        if(err){
          console.log(err)
        } else if (nivFound) {
          res.render('subjectsView', {
            user: user,
            subjects: nivFound.subjects
          });
        }
      });
    } else {
      req.flash('danger','you can not do that buddy');
      res.redirect('/');
    }
  });
});


module.exports = router;
