const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
// bringing models

let CoursesList = require('../models/coursesList.js');
let Course = require('../models/course.js');
router.get('/:groupId/:subjectId',function(req, res){
  CoursesList.findOne({groupId: req.params.groupId, subjectId: req.params.subjectId},function(err, coursesList){
    if(err){
      console.log(err);
    }else{
      console.log(coursesList.courses)
      Course.populate(coursesList.courses,{path: "publisher",select:"fName", model: 'Ens'},function(err,courses){
        console.log("in" + coursesList);
        res.render('coursesListView',{
          coursesList: coursesList,
          niv: req.params.nivId,
          group: req.params.groupId,
          subject: req.params.subjectId
        });
      });
      console.log("out" + coursesList);
    }
  })
});


module.exports = router;
