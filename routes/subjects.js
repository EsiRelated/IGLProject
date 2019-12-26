const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ensureAuthenticated = require('../public/js/ensureAuthenticated.js')

// bringing models

let CoursesList = require('../models/coursesList.js');
let Course = require('../models/course.js');

// courses route
router.get('/:groupId/:subjectId', ensureAuthenticated, function(req, res){
  CoursesList.findOne({groupId: req.params.groupId, subjectId: req.params.subjectId}).populate('courses').exec(function(err, coursesList){
    if(err){
      console.log(err);
    }else if (coursesList){
      Course.populate(coursesList.courses,{path: "publisher",select:"fName lName", model: 'Ens'},function(err,courses){
        res.render('coursesListView',{
          coursesList: coursesList,
          niv: req.params.nivId,
          group: req.params.groupId,
          subject: req.params.subjectId
        });
      });
    }
  })
});

module.exports = router;
