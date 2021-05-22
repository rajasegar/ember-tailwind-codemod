'use strict';

const workerpool = require('workerpool');
const transformFile = require('./transformFile');

// create worker and register public functions
workerpool.worker({
  transformFile,
});
