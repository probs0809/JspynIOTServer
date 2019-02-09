//This code is the copyright of Prabodh Mayekar
var WebSocketServer   = require('websocket').server;
var bodyParser        = require('body-parser');
var upload            = require('multer')();
var mqttServer        = require('./mod/mqttServer.js');
var app		 			      = require('./mod/expressServ.js');
var expressServer 		= require('./mod/expressServer.js');
var socket            = require('socket.io-client')('http://localhost');
var eventEmitter  		= require('./mod/events.js');
var wsServ            = require('express')();
var io                = require('./mod/socket.js');

app.set('view engine', 'pug');
app.set('views','./Views');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', require('./mod/routes.js'));
app.use('/transmit', require('./mod/transmit.js'));
app.use('/upload', require('./mod/upload.js'));


app.get('*', (req,res)=>{
    res.writeHead(404);
    res.end('<h1>404 Not Found</h1>');
});

//__________________________________________________________________________________________________________//
expressServer.listen(80, () => {
  	console.log('listening on :80');
});

wsServer = new WebSocketServer({
  	httpServer: wsServ.listen(8080),
  	autoAcceptConnections: false
});
 
var originIsAllowed = (origin) => {
  	return true;
}
 
wsServer.on('request', (request) => {
	if (!originIsAllowed(request.origin)) {
    	request.reject();
    	console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    	return;
  	}
  	var connection = request.accept();
  	console.log((new Date()) + ' Connection accepted.');
  	connection.on('message', (message) => {       
      	if (message.type === 'utf8') {
          if(isJSON(message.utf8Data)){
        	   var clientIP = JSON.parse(message.utf8Data);
             //console.log(message.utf8Data);
        	   var api = clientIP.api ;
             //console.log(api);
        	   var sensorId = clientIP.id ;
           // connection.send("Hello World");
        	   if (sensorId == "JSPYN_IOT"){//keeping id : IOT_DEVICE is for IOT_DEVICE to listen
          		    eventEmitter.on("JSPYN_IOT" + api , (data) => {
                  connection.send(data);
          	   });
        	   }

        	   else{
          		    eventEmitter.on(api + sensorId, (data) => {
            	    connection.send(data);
          	   });
        	   }
          }
          else{
            connection.send("Error: Please Send JSON Object");
          }   
      	}
      	else if (message.type === 'binary') {
        	console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        	connection.send("Error: Please Send JSON Object");
      	}
  	});
  	connection.on('close', (reasonCode, description) => {
      	console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  	});
});


var isJSON = (item) => {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } 
    catch (e) {
        return false;
    }
    
    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}
