/**
 * 日志中间件
 * https://www.npmjs.com/package/morgan
 *
 * morgan(format, options)
 * format : 定义日志输出格式
 *   可选值:格式化字符串，预订义格式化模板，返回格式化字符串的函数
 *   如：dev 就是预订义模板
 *     请求方法  url  http状态码 响应时间      单位毫秒  响应体长度
 *     :method :url :status :response-time ms - :res[content-length]
 *     POST /api/v1/order_meeting 200 21.668 ms - 300
 */

 var fs = require('fs');
 var path = require('path');
 var morgan =require('morgan');
 var rfs = require('rotating-file-stream');
// 确保日志路径存在
var logDirectory = path.resolve(__dirname,'../log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory) //检测文件路径

// 日期格式化
function pad(num) {
  return num > 9 ? num : `0${num}`;
}

/**
 * 日志文件名生成函数
 * @param  {[type]} time  时间
 * @param  {[type]} index 下标
 */

 function generator(time,index){
  if(!time) time = new Date();
  if(!index) index = '0';
  var year = time.getFullYear();
  var month = pad(time.getMonth() + 1);
  var day = pad(time.getDate());

  return `${year}-${month}-${day}-${index}.log`
 }

 var accessLogStream = rfs(generator,{
  size:'10M',
  interval:'1d',
  path:logDirectory
 })

 module.exports = morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]',{
  immediate:true,
  stream:accessLogStream
 })