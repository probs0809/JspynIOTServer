const expressServer = require('./expressServer.js');
const io = require('socket.io')(expressServer);
io.setMaxListeners(100000);

module.exports = io;