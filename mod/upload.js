const app = require("express").Router();
const { toInteger } = require("lodash");
const utility = require('./Utility');

app.post("/gps", (req, res) => {
  try {
    utility.gps(
      req.body.api,
      toInteger(req.body.index),
      req.body.lattitude,
      req.body.longitude
    );
    res.writeHead(200);
  } catch (error) {
    res.writeHead(400);
  }

  res.end();
});

app.get(
  "/:api(*0*8*0*9*j*s*p*n*)/gps/:index/:lattitude/:longitude",
  (req, res) => {
    try {
      utility.gps(
        req.body.api,
        toInteger(req.params.index),
        req.body.lattitude,
        req.body.longitude
      );
      res.writeHead(200);
    } catch (error) {
      res.writeHead(400);
    }
    res.writeHead(200);
    res.end();
  }
);

app.post("/sensor", (req, res) => {
  try {
    utility.sensorDataUpload(
      req.body.api,
      toInteger(req.body.index),
      req.body.name,
      req.body.value
    );
    res.writeHead(200);
  } catch (error) {
    res.writeHead(400);
  }

  res.end();

});

app.get("/:api(*0*8*0*9*j*s*p*n*)/sensor/:name/:index/:value", (req, res) => {
  try {
    utility.sensorDataUpload(
      req.params.api,
      toInteger(req.params.index),
      req.params.name,
      req.params.value
    );
    res.writeHead(200);
  } catch (error) {
    res.writeHead(400);
  }
  res.end();
}
);



module.exports = app;
