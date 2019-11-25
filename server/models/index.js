const mongoose = require('mongoose');
const chalk = require('chalk');
const handleError = require('../helpers/error.js');
mongoose.set("debug", true);
mongoose.Promise = Promise;

const URI = 'mongodb://localhost:27017/chat-app';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
};

mongoose.connect(URI, options).catch((error) => (handleError(error)));

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;


mongoose.connection.on('connected', () => {
  console.log(connected("Mongoose default connection is open to ", URI));
});

mongoose.connection.on('error', function (err) {
  console.log(error("Mongoose default connection has occured " + err + " error"));
});

mongoose.connection.on('disconnected', () => {
  console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(termination("Mongoose default connection is disconnected due to application termination"));
    process.exit(0)
  });
});


module.exports.User = require("./user");