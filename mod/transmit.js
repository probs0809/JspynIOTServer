var app = require('express').Router();
var eventEmitter = require('./events');
var io = require('./socket.js');
var mqtt              = require('mqtt');
var mqttClient        = mqtt.connect('mqtt://localhost');
app.post('/',(req,res)=>{
	transmit(req.body.api,req.body.gpioValue);
  //console.log(req.body.api+" "+req.body.gpioValue);
	res.writeHead(200);
	res.end();
});
app.get("/:api(*0*8*0*9*j*s*p*n*)/:gpioValue" , (req, res) =>{
  	transmit(req.params.api,req.params.gpioValue);
  	res.writeHead(200);
	  res.end();
});

var transmit = (api, gpioValue) =>{
	var nsp = io.of("/" + api);
  	nsp.emit("value" , gpioValue);
  	eventEmitter.emit("api" , api);
  	eventEmitter.emit("IOT_DEVICE" , gpioValue);
  	eventEmitter.emit("IOT_DEVICE" + api , gpioValue);
    mqttClient.publish(api, gpioValue);
}
module.exports = app;