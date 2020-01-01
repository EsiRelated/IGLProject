const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const ensureAuthenticated = require('../public/js/ensureAuthenticated.js')
//const gfs = require('../config/dbConnection').gfs

//console.log(gfs)

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

router.get("/files/:filename", ensureAuthenticated,function(req, res){
  console.log(gfs)
  if(!gfs){
    req.flash("danger", "database connection error")
    res.redirect('/');
  } else {
    let query = {filename: req.params.filename}
    gfs.find(query).toArray(function(err, files){
      if(err){
        console.log(err);
      } else {
        if(files){
          res.set('Content-Type', files[0].contentType);
          gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
          req.flash("danger","no such a file")
          res.redirect('/')
        }
      }
    });
  }
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
