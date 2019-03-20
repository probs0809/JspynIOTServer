var mosca = require('mosca');
const http = require('http');
 
var settings = {
  port: 1883,
};
 
var server = new mosca.Server(settings);
 
server.on('published', function(packet, client) {
  //console.log('Published', packet.payload);
  //console.log('client', client.toString());
});

server.on('clientConnected', function(client) {
  var topic = client.id;
  var fTopic = topic.slice(0,41);
  http.get("http://us-central1-jspyn-39604.cloudfunctions.net/jspynio/transmit/status/"+fTopic+"/1")
});

server.on('clientDisconnected', function(client){
  var topic = client.id;
  var fTopic = topic.slice(0,41);
  http.get("http://us-central1-jspyn-39604.cloudfunctions.net/jspynio/transmit/status/"+fTopic+"/0")
});

 
server.on('ready', setup);
 
function setup() {
  console.log('Mosca server is up and running');
}

