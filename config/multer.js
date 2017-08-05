var fs = require('fs');
var path = require('path');
var multer = require('multer');

var mkdirs = function(dirpath,mode,callback){
  fs.exists(dirpath,function(exists){
    exists ? callback(dirpath) : mkdirs(path.dirname(dirpath),mode,function(){
      fs.mkdir(dirpath,mode,callback);
    });
  });
};

var fillZero = function (val) {
  return val > 9 ? val : `0${val}`;
}

var storage = multer.diskStorage({
  destination: function(req,file,cb){ //cb  = callback
    var  date = new Date();
    var  reg = new RegExp(/image/i)
    var  pathto = `assets/${reg.test(file.mimetype) ? 'img':'file'}/${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`
    fs.exists(pathto,function(exist){
      exist ? cb(null,pathto,req.body) : mkdirs(pathto,0777,function(){
        cb(null,pathto,req.body); 
      })
    })
  },
  filename:function(req,file,cb){
    var suffix = file.mimetype.split('/')[1]
    suffix = suffix ? '.' + suffix : ''
    cb(null,Date.now() + suffix,req.body);
  }
})

// 导出对象

module.exports = multer({storage:storage});