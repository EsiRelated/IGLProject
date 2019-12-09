const express = require('express');
const router = express.Router();

// bringing models

let CoursesList = require('../models/coursesList.js');

router.get('/:nivId/:groupId/:subjectId',function(req, res){
  CoursesList.findOne({nivId:req.params.nivId, groupId: req.params.groupId, subjectId: req.params.subjectId},function(err, coursesList){
    if(err){
      console.log(err);
    }else{
      res.render('coursesListView',{
        coursesList: coursesList,
        niv: req.params.nivId,
        group: req.params.groupId,
        subject: req.params.subjectId
      })
    }
  })
});


module.exports = router;
