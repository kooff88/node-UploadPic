var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

var controller = {
  upload: function (req,res){
    var file = req.file;
    if (!file) return  res.json({code:1,message:"上传文件不存在"})
    res.json({code:0,data:{ originalname:file.originalname,size:file.size,filename:file.filename,path:file.path.replace('assets','') } })
  },
  image:function(req,res){
    var filepath = path.join(__dirname,'assets',req.path);
    fs.exists(filepath,(exist)=>{
      exist ? controller.crop(req,res,filepath) : res.json({code:1,message:'请求文件不存在'})
    });
  },file: function (req, res) {
    var filepath = path.join(__dirname, 'assets', req.path);
    fs.exists(filepath, (exist) => {
      exist ? res.sendFile(filepath) : res.json({ code: 1, message: '请求文件不存在' })
    });
  },
  crop: function (req,res,filepath){
    var w = req.query.w ? parseInt(req.query.w,10) : null;
    var h = req.query.h ? parseInt(req.query.h,10) : null;
    if (w === 0 || h === 0) return res.sendFile(filepath);
    sharp(filepath).resize(w,h).crop(sharp.strategy.center).toBuffer().then((buffer) => {
      var suffix = filepath.substr(filepath.lastIndexOf('.') + 1);
      res.set('Content-Type', `image/${suffix}`);
      res.send(buffer);
    }).catch((err)=>{
      res.sendFile(filepath);
    })
  }
}

module.exports = controller;