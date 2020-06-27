const app = require('express').Router();
const api = require('./Utility').getAPI();
//used to see recieved data and sent data
app.post("/", (req, res) => {
	res.writeHead(200);
	res.end();
});

app.get('/api', (req, res) => {
	res.writeHead(200);
	res.end(api);
	console.log(api);
});

app.get('/recieve/:api(*0*8*0*9*j*s*p*n*)', (req, res) => {
	var vapi = req.params.api;
	res.render('recieve', {
		apis: vapi
	});
});

//the above code is just for Teating purpose

//used for accesing sensor value
app.get('/gps/:api(*0*8*0*9*j*s*p*n*)/:count/:tag', (req, res) => {
	var vapi = req.params.api;
	var vtag = req.params.tag;
	var vgpsCount = req.params.count;
	res.render('gps', {
		apis: vapi,
		tags: vtag,
		count: vgpsCount
	});
});

app.get('/gpsref/:api(*0*8*0*9*j*s*p*n*)/:count/:tag', (req, res) => {
	var vapi = req.params.api;
	var vtag = req.params.tag;
	var vgpsCount = req.params.count;
	res.render('gpsRef', {
		apis: vapi,
		tags: vtag,
		count: vgpsCount
	});
});


app.get('/sensor/:api(*0*8*0*9*j*s*p*n*)/:sensorName/:count', (req, res) => {//sensorName: temperatureSensorCel , count: 0
	var vapi = req.params.api;
	var vsensorName = req.params.sensorName;
	var vsensorCount = req.params.count;
	res.render('sensor', {
		apis: vapi,
		name: vsensorName,
		count: vsensorCount
	});
});

module.exports = app;