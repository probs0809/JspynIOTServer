const app = require('express').Router();
const utility = require('./Utility');
app.post('/',(req,res)=>{
	utility.transmit(req.body.api,req.body.gpioValue);
	res.writeHead(200);
	res.end();
});
app.get("/:api(*0*8*0*9*j*s*p*n*)/:gpioValue" , (req, res) =>{
  	utility.transmit(req.params.api,req.params.gpioValue);
  	res.writeHead(200);
	res.end();
});


module.exports = app;