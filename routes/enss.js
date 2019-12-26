const express = require('express');
const Course = require('../classes/course.js');
const router = express.Router();
const mongoose = require('mongoose')

// bringing models
let CoursesList = require('../models/coursesList.js');
let Niv = require('../models/niv.js');
let Person = require('../models/person.js')
let Ens = require('../models/ens.js')

let ens1 = new Ens({
  personId:"16/0366",
  fName:"first",
  lName:"last",
  bDay:Date.now(),
  grade:"idgaf",
  teaching:[
    {
      subjectId: 'IGL',
      groupsIds: ["1CS1"]
    },
    {
      subjectId: 'POO',
      groupsIds: ["2CP1","2CP2"]
    }
  ]
});
//console.log(ens1)
//ens1.save()
router.get('/addCourse',function(req, res){
  //console.log(ens1.teaching);
  res.render('add_course', {
  title:'Add Article',
  teaching: ens1.teaching
});
});


router.post('/addCourse',function(req, res){
  let newCourse = new Course(ens1._id,req.body.subject,req.body.title,req.body.courseFile);
  for (i = 0; i < req.body.groupSelection.length; i++) {
    let query = {groupId:req.body.groupSelection[i], subjectId:req.body.subject}
    CoursesList.findOneAndUpdate(query,{$push: {courses: newCourse}},function(err,doc){
      err ? console.log('error') : console.log('success');
      if(!doc){
        console.log(query.groupId);
        coursesList = new CoursesList({groupId: query.groupId, subjectId:query.subjectId, courses: [newCourse]});
        console.log(coursesList);
        coursesList.save();
      }
    });
  }
  res.redirect('/');
});

module.exports = router;
