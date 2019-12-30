const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require ('./config/database');
const connectFlash = require('connect-flash');
const expressMessages = require('express-messages');
const expressValidator = require('express-validator');

//connecting to database
mongoose.connect(config.database);
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

// passport config
require('./config/passport.js')(passport);

// express session  middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//express messages
app.use(connectFlash());
app.use(function (req, res, next) {
  res.locals.messages = expressMessages(req, res);
  next();
});


//passport middleware
app.use(passport.initialize());
app.use(passport.session());






// bringing models
let CoursesList = require('./models/coursesList.js');
let Course = require('./models/course.js');




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

app.get("*", function(req, res, next){
  //console.log(req);
  res.locals.user = req.user || null;
  console.log("here " + req.user)
  next();
})

//routes files
let enss = require('./routes/enss.js');
let students = require('./routes/students.js');
let users = require('./routes/users.js');
let subjects = require('./routes/subjects.js');
app.use('/enss', enss);
app.use('/students', students);
app.use('/users', users);
app.use('/subjects', subjects);



// Home route
app.get("/", function (req,res){
  res.render('homePage');
});







//testing

let Subject = require('./models/subject.js');
let Ens = require('./models/ens.js');
let Person = require('./models/person.js')
let Niv = require('./models/niv.js')
let Student = require('./models/student.js')
let User = require('./models/user.js')

//let student = new Student({personId: '16/0213',fName:'fname1',lName:'lname1',bDay: Date.now(), group:'1CS1'});
//student.save()
/*let subjects = [
  new Subject({niv: '1CS',subjectId: 'IGL',fullName: 'IGL', coef: 5 , credit: 4}),
  new Subject({niv: '1CS',subjectId: 'THP',fullName: 'THP', coef: 4 , credit: 3}),
  new Subject({niv: '1CS',subjectId: 'ROP',fullName: 'ROP', coef: 4 , credit: 3}),
  new Subject({niv: '1CS',subjectId: 'SYC1',fullName: 'SYC1', coef: 4 , credit: 3}),
  new Subject({niv: '1CS',subjectId: 'RES1',fullName: 'RES1', coef: 4 , credit: 3}),
  new Subject({niv: '1CS',subjectId: 'ORG',fullName: 'ORG', coef: 4 , credit: 3}),
  new Subject({niv: '1CS',subjectId: 'ANUM',fullName: 'ANUM', coef: 4 , credit: 3})
];

Subject.insertMany(subjects,function(err){
  console.log(err);
});*/
/*Subject.find({niv: "1CS"}, function(err, docs) {
  if(err){
    console.log(err);
  } else {
    let subjectsIds = [];
    let i = 0;
    for (i = 0 ;i < docs.length; i++)
      subjectsIds[i] = docs[i]._id;
    console.log(subjectsIds)
    let niv1 = new Niv({
      nivId: "1CS",
      subjects: subjectsIds
    })
    niv1.save();
  }
})
*/
//let ens1 = new Ens({personId: '16/0386',fName:'test',lName:'test',bDay: Date.now(), grade: 'idfk'});
//Ens.findOne({personId:'16/0386'},function(err,doc){
  //let user1 = new User({email: "g@f.com", password:"1234", accountOwner: doc._id});
  //user1.save();
  //User.findOne({email: "g@f.com"}).populate({path: 'accountOwner'}).exec(function(err,doc){
  //  console.log(doc);
  //})
//})
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



/*let subjects = [
  new Subject({niv:'1CS',subjectId: 'IGL', coef: 5 , credit: 4}),
  new Subject({niv:'2CP',subjectId: 'POO', coef: 5 , credit: 4}),
];
console.log(subjects)
Subject.insertMany(subjects,function(err){
  console.log(err);
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
