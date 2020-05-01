const nodemailer = require("nodemailer");
const chokidar = require('chokidar');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const fs = require('fs');

// load environment variables..
require('dotenv').config()
const app = express();

const ss_path = process.env.SS_PATH;
const sendMail = require('./mail.js');



const watcher = chokidar.watch(ss_path, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});


const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('change', path => {
    sendMail(path);
    log(path);
  })



const port = process.env.PORT;

const server = app.listen(port, (req, res) => {
  console.log(`running on port ${port}`.green.bold);
});


// handel unhandeled promise rejections in entire app and exit..
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // close the server and exit
  server.close(() => process.exit(1));
});
