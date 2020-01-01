const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require ('./config/database');
const connectFlash = require('connect-flash');
const expressMessages = require('express-messages');
const expressValidator = require('express-validator');
const initApp = require('./public/js/init.js');
const multer = require('multer')
const GridFSStorage = require('multer-gridfs-storage')
const gfs = require("./config/dbConnection.js").gfs;


//init app
app = express();

let port = 3000

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

// all routes
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

// init route
app.get("/init", function(req, res){
  initApp();
  res.redirect('/');
})

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
