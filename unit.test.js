Course = require('./models/course.js');
const mongoose = require('mongoose');

// setting connection to the testing database
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connection = mongoose.connection;

let newCourse = new Course({
  subject: "IGL",
  title: "UML",
  courseFile: "file_thisisarandomnumber.pdf"
});


test("Ajouter un cour", (done) => {
    connection.once("open", () => {
    newCourse.save(() => {
      Course.findOne({_id: newCourse._id}, function(err,foundCourse){
        expect(foundCourse._id).toEqual(newCourse._id);
        done();
      })
    });
  })
})

test("Consulter cour",(done) => {
  Course.findOne({_id: newCourse._id}, function(err,foundCourse){
    expect(foundCourse._id).toBeDefined();
    done();
  })
})
