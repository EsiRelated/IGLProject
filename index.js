const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//connecting to database
mongoose.connect('mongodb://localhost/scolar');
let db = mongoose.connection;

//check connection
db.once('open',function(){
  console.log('connected to mongodb');
});

//check for errors
db.on('error',function(err){
  console.log(err);
});

//init app
app = express();

let port = process.env.PORT || 3000

// starting the server
app.listen(port,() => {console.log(`listening to port ${port}`)});



//body parses middleware to read req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, '/public')));


// setting views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// bringing models
let CoursesList = require('./models/coursesList.js');
const Course = require('./classes/course.js');




//pregenerated array for testing
/*let coursesLists = new CoursesList({
  nivId: '1CS',
  groupId: '1',
  subjectId:'IGL',
  courses:[
    {
      ensName: 'name1',
      title: 'title1',
      courseFile: 'this is a file for IGL gr1'
    },
    {
      ensName: 'name2',
      title: 'title2',
      courseFile: 'this is also a file for IGL gr1'
    }
  ]
})
coursesLists.save();

coursesLists = new CoursesList({
  nivId: '1CS',
  groupId: '2',
  subjectId:'IGL',
  courses:[
    {
      ensName: 'name2',
      title: 'title2',
      courseFile: 'this is a file for IGL gr2'
    },
    {
      ensName: 'name2',
      title: 'title2',
      courseFile: 'this is also a file for IGL gr2'
    }
  ]
});

coursesLists.save();
*/

//routes files
let enss = require('./routes/enss');
let students = require('./routes/students');
app.use('/enss', enss);
app.use('/students', students);


// Home route
app.get("/", function (req,res){
    CoursesList.find({},function(err, coursesLists){
    if(err){
      console.log(err);
    }else{
      res.render('coursesLists',{
        title: 'Home page',
        coursesLists:coursesLists
      });
      //console.log(coursesLists);
    }
  });
});










//testing

let Subject = require('./models/subject.js');
let Ens = require('./models/ens.js');
let Person = require('./models/person.js')
let Niv = require('./models/niv.js')

/*let subjects = [
  new Subject({name: 'IGL', coef: 5 , credit: 4}),
  new Subject({name: 'THP', coef: 4 , credit: 3}),
  new Subject({name: 'ROP', coef: 4 , credit: 3})
];

Subject.insertMany(subjects,function(err){
  console.log(err);
});*/

let ens1 = new Ens({personId: '16/0356',fName:'first',lName:'last',bDay: Date.now(), grade: 'idfk'});

/*let teaching = [] ;
Subject.find({name: {$in: ['IGL', 'ROP']}},function(err,docs) {
    if(err){
      console.log(err);
    }else{
      console.log(docs);
      for(i in docs){
        teaching.push(docs[i]._id)
      }
     console.log(teaching);
     ens1.teaching = teaching;
    }
  //  ens1.save();
});*/
//ens1.save();
/*Person.findOne({personId:'16/0366'},function(err,doc){
  if(err){
    console.log(err)
  }else{
    Person.findOne({_id: doc._id}).populate({path:'teaching.subjectRef', model:'Subject'}).exec(function(err,doc){
      console.log(doc);
    });
    console.log(doc);
    }
});

*/


















/*const Student = require('./classes/student.js');
const Map = require('./classes/map.js');
const Work = require('./classes/work.js');
const Couple = require('./couple.js');

//Test Etudiant>
let s = new Student("azz","ham","03/02/1999","16/287","1CS",1,new Map([]));
s.addWork("IGL",new Work("tp1","this is supposed to be a file"));
s.addWork("IGL",new Work("tp2","this is supposed to be a file"));
s.addWork("THP",new Work("exo1","this is supposed to be a file"));
console.log(s.getWorks().getCouple("IGL"));*/
