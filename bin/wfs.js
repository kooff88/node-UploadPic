var app = require('../app');
var debug = require('debug')('base:server');
var http = require('http');
var port = 3114;
app.set('port',port);

var server = null;

function onError(error){
  if(error.syscall !== 'listen'){
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port'  + port;

  switch(error.code){
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }  
}

function onListening(){
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('> http://127.0.0.1:' + addr.port);
}

server = http.createServer(app);
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);
