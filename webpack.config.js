var path = require('path');
var fs = require('fs');

var dev = require('./webpack.dev');
// var dev = require('./webpack.dev');
var prod = require('./webpack.prod');

// var workbox = require('./webpack.workbox');

// module.exports = [workbox, dev, prod];
module.exports = [ dev, prod];
