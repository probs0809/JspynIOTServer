var expressServer 		= require('./expressServer.js');
var io 					      = require('socket.io')(expressServer);
io.setMaxListeners(100000);

module.exports = io;