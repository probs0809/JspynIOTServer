var mosca = require('mosca');
 
var settings = {
  port: 1883,
};
 
var server = new mosca.Server(settings);
 
server.on('published', function(packet, client) {
  //console.log('Published', packet.payload.toString());
});
 
server.on('ready', setup);
 
function setup() {
  console.log('Mosca server is up and running');
}

