var express = require('express');
var morgan = require('morgan');
var mongoose = require("mongoose");
const bodyParser = require('body-parser');

var api = require('./api/api');

var app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function () {
  console.log('Webserver is ready');
});

mongoose.connect('mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon',(err) => {
  if (err) {
    console.log("Error occured during connecting to instance: ", err);
    throw err;
  }

  console.log("Successfully connected.");
});

// For docker status
app.get('/health-check', function (req, res) {
  res.send('Healthy');
});

app.use('/', api);

// quit on ctrl-c in docker
process.on('SIGINT', function onSigint () {
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
		}
		process.exit();
  })
}