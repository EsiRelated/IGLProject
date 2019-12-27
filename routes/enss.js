const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const ensureAuthenticated = require('../public/js/ensureAuthenticated.js');


// bringing models
let CoursesList = require('../models/coursesList.js');
let Course = require('../models/course.js');
let Niv = require('../models/niv.js');
let Person = require('../models/person.js')
let Ens = require('../models/ens.js')
let Group = require('../models/group.js')

/*let ens1 = new Ens({
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
});*/
//console.log(ens1)
//ens1.save()

// adding  a course form
router.get('/addCourse', ensureAuthenticated, ensureEnsType, function(req, res){
  res.render('addCourse', {
    teaching: req.user.accountOwner.teaching
  });
});

// adding a course process
router.post('/addCourse', ensureAuthenticated, ensureEnsType, function(req, res){
  let newCourse = new Course({
    publisher: req.user.accountOwner._id,
    subject: req.body.subject,
    title: req.body.title,
    courseFile: req.body.courseFile
  });
  newCourse.save()
  console.log("HHH0 "+ newCourse._id)
  let groupSelection = req.body.groupSelection instanceof Array ? req.body.groupSelection : [req.body.groupSelection];
  console.log(groupSelection)
  for (let group of groupSelection) {
    let query = {groupId:group, subjectId:req.body.subject}
    CoursesList.findOneAndUpdate(query,{$push: {courses: newCourse._id}},function(err,doc){
      if (err){
        console.log(err);
      } else {
          if(!doc){
            console.log(query.groupId);
            coursesList = new CoursesList({groupId: query.groupId, subjectId:query.subjectId, courses: [newCourse._id]});
            console.log(coursesList);
            coursesList.save();
            Group.findOneAndUpdate({groupId: query.groupId},{$push:{coursesLists: coursesList}}, function(err, doc){
              if(err){
                console.log(err)
              } else {
                if(!doc){
                  group = new Group({groupId: query.groupId, coursesLists: [coursesList]});
                  group.save();
                }
              }
            })
          }
          query1 = {"_id": req.user.accountOwner._id, "teaching.subjectId": query.subjectId}
          Ens.findOneAndUpdate(query1,{$push:{"teaching.$.publishedCourses": newCourse._id}},function(err, doc){
            if(err)
              console.log(err)
            else
              console.log("updated ens : " + doc)
          })
          req.flash('success', 'course added')
        }
    });
  }
  res.redirect('/users/'+req.user.username);
});

// Ensures that only enss can add a course
function ensureEnsType(req, res, next){
  console.log('im in')
  if(req.user.accountOwner instanceof Ens){
    return next();
  } else{
    req.flash('danger', 'you can not do that buddy');
    res.redirect('/users/'+req.user.username)
  }
}

module.exports = router;
