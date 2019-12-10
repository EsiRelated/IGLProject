const express = require('express');
const Course = require('../classes/course.js');
const router = express.Router();


// bringing models
let CoursesList = require('../models/coursesList.js');
let Niv = require('../models/niv.js');


router.get('/addCourse',function(req, res){
  res.render('add_course', {
  title:'Add Article'
});
});


router.post('/addCourse',function(req, res){
  console.log(req.body);
  let newCourse = new Course(req.body.ensName,req.body.title,req.body.courseFile);
  for (i = 0; i < req.body.groupSelection.length; i++) {
    console.log(i);
    console.log(req.body.nivSelection + req.body.groupSelection[i]);
    CoursesList.findOneAndUpdate({groupId: req.body.nivSelection + req.body.groupSelection[i], subjectId:req.body.subject},{$push: {courses: newCourse}},function(err){
      err ? console.log('error') : console.log('success');
    });
  }
  res.redirect('/');
});

module.exports = router;
