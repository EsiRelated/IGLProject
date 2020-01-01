  // bringing models
  let Subject = require('../../models/subject.js');
  let Ens = require('../../models/ens.js');
  let Person = require('../../models/person.js')
  let Niv = require('../../models/niv.js')
  let Student = require('../../models/student.js')
  let User = require('../../models/user.js')
  const bcryptjs = require('bcryptjs');

module.exports = function(){
  // adding some subjects to database
  let subjects1CS = [
    new Subject({niv: '1CS',subjectId: 'IGL',fullName: 'IGL', coef: 5 , credit: 4}),
    new Subject({niv: '1CS',subjectId: 'THP',fullName: 'THP', coef: 4 , credit: 3}),
    new Subject({niv: '1CS',subjectId: 'ROP',fullName: 'ROP', coef: 4 , credit: 3}),
    new Subject({niv: '1CS',subjectId: 'SYC1',fullName: 'SYC1', coef: 4 , credit: 3}),
    new Subject({niv: '1CS',subjectId: 'RES1',fullName: 'RES1', coef: 4 , credit: 3}),
    new Subject({niv: '1CS',subjectId: 'ORG',fullName: 'ORG', coef: 4 , credit: 3}),
    new Subject({niv: '1CS',subjectId: 'ANUM',fullName: 'ANUM', coef: 4 , credit: 3})
  ];

  Subject.insertMany(subjects1CS,function(err){
    if (err){
      console.log(err);
    }
  });

  // adding Niv 1CS to database
  let subjectsIds = [];
  let i = 0;
  for (i = 0 ;i < subjects1CS.length; i++)
    subjectsIds[i] = subjects1CS[i]._id;
  console.log(subjectsIds)
  let niv1CS = new Niv({
    nivId: "1CS",
    subjects: subjectsIds
  })
  niv1CS.save();

  // adding a student to database
  let student = new Student({
    personId: '16/0287',
    fName:'Abdelaziz',
    lName:'HAMDI',
    bDay: new Date("1999,2,3"),
    group:'1CS1'
  });
  student.save()

  // creating an account (user) for the student
  let userStudent = new User({
    username:"a_hamdi",
    email:"ga_hamdi@esi.dz",
    password:"1234",
    accountOwner: student._id
  });
  bcryptjs.genSalt(10,function(err, salt){
    bcryptjs.hash(userStudent.password, salt, function(err, hash){
      if(err){
        console.log(err);
      }else{
        userStudent.password = hash;
        userStudent.save();
      }
    });
  })


  // adding a ens to database
  let ens = new Ens({
    personId:"16/0366",
    fName: "ensFirst",
    lName: "ensLast",
    bDay: new Date("1988,2,3"),
    grade: "6",
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
  ens.save();

  // creating an account (user) for ens
  let userEns = new User({
    username:"ens1",
    email:"ens1@esi.dz",
    password:"1234",
    accountOwner: ens._id
  });
  bcryptjs.genSalt(10,function(err, salt){
    bcryptjs.hash(userEns.password, salt, function(err, hash){
      if(err){
        console.log(err);
      }else{
        userEns.password = hash;
        userEns.save(function(err){
          if(err)
            console.log(err)
        });
      }
    });
  })
}
