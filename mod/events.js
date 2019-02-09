var event = require('events');
var eventEmitter = new event.EventEmitter();
eventEmitter.setMaxListeners(100000);
module.exports = eventEmitter;