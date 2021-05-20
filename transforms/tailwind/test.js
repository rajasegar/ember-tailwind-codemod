'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({
  name: 'tailwind',
  '--css=super-rental.css',
});
