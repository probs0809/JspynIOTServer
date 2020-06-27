const mosca = require('mosca');
const http = require('http');
 
var settings = {
  port: 1883,
};
 
var server = new mosca.Server(settings);
 
server.on('published', (packet, client) => {
  //console.log('Published', packet.payload);
  //console.log('client', client.toString());
});

server.on('clientConnected', (client) => {
  var topic = client.id;
  var api = topic.slice(0,41);
  //http.get("http://us-central1-jspyn-39604.cloudfunctions.net/jspynio/transmit/status/"+api+"/1")
});

server.on('clientDisconnected', (client) => {
  var topic = client.id;
  var api = topic.slice(0,41);
  //http.get("http://us-central1-jspyn-39604.cloudfunctions.net/jspynio/transmit/status/"+api+"/0")
});

server.on('ready', () => console.log(`Mosca server is up and running on ${settings.port}`));

