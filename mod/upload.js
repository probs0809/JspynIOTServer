var app = require('express').Router();
var eventEmitter = require('./events.js');
var io = require('./socket.js');

app.post('/gps', (req,res)=>{
  gps(req.body.api, req.body.count, req.body.lattitude, req.body.longitude);
  res.writeHead(200);
  res.end();
});

app.get('/:api(*0*8*0*9*j*s*p*n*)/gps/:count/:lattitude/:longitude', (req,res) => {
	gps(req.params.api, req.params.count, req.params.lattitude, req.params.longitude);
	res.writeHead(200);
  res.end();
});

var gps = (api, count, alattitude, alongitude) =>{
  var GPSobject ={
    lattitude : alattitude,
    longitude : alongitude
  };

  var gpsSend = JSON.stringify(GPSobject);
  eventEmitter.emit(api + "GPS" + count, gpsSend);
  var send = io.of('/' + api + '/' + count);
  send.emit('lattitude', alattitude);
  send.emit('longitude', alongitude);
}

app.post('/sensor', (req, res) => {
    //var processedValue = sensorFunction(req.body.sensorName, req.body.value);

    eventEmitter.emit(req.body.api + req.body.sensorName + req.body.count , req.body.value);//under progress
    var send = io.of('/' + req.body.api + '/' + req.body.sensorName + '/' + req.body.count);
    send.emit('sensorValue', req.body.value);
    send.emit('sensorName', req.body.sensorName);
    res.writeHead(200);
    res.end();
});

app.get('/:api(*0*8*0*9*j*s*p*n*)/sensor/:sensorName/:count/:value', (req, res) => {
    //var processedValue = sensorFunction(req.params.sensorName, req.params.value);
   // console.log(parseInt(processedValue));
    eventEmitter.emit(req.params.api + req.params.sensorName + req.params.count , req.params.value);//under progress
    var send = io.of('/' + req.params.api + '/' + req.params.sensorName + '/' + req.params.count);
    send.emit('sensorValue', req.params.value);
    send.emit('sensorName', req.params.sensorName);
    res.writeHead(200);
    res.end();
});


module.exports = app;