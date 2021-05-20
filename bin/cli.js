#!/usr/bin/env node
'use strict';

console.log(process.argv);
require('codemod-cli').runTransform(
  __dirname,
  //process.argv[2] [> transform name <],
  'tailwind',
  process.argv.slice(2),
  'hbs'
);
