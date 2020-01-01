const mongoose = require('mongoose');
const path = require('path');
const config = require ('./database');

// setting connection to the database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connection = mongoose.connection;

//check for errors
connection.on('error',function(err){
  console.log(err);
});

// file uplaod config
global.gfs = undefined;
connection.once("open", () => {
  console.log('connected to mongodb');
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "uploads"
  });
});
