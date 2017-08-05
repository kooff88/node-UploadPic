var multer = require('./config/multer');
var controller = require('./controller');

module.exports = function(app){
  app.post('/wfs/v1/upload',multer.single('file'),controller.upload);
  app.get('/img/*',controller.image);
  app.get('/file/*',controller.file)
}