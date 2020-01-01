const multer = require('multer')
const GridFSStorage = require('multer-gridfs-storage')
const path = require('path');
const config = require ('./database.js');

// storage config
storage = new GridFSStorage({
  url: config.database,
  options:{
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  file: function(req, file){
    return {
        filename : "file_" + Date.now()+ path.extname(file.originalname),
        bucketName: "uploads"
    }
  }
});

module.exports = uplaod = multer({storage})
