'use strict';

const fs = require('fs');
const transform = require('../transforms/tailwind/index');

module.exports = function (filename, options) {
  return readFile(filename)
    .then((contents) => applyTransform(contents, options))
    .then((output) => writeFile(filename, output))
    .then((output) => ({
      type: 'update',
      file: filename,
      status: output.skipped ? 'skipped' : output.changed ? 'ok' : 'nochange',
    }))
    .catch((err) => {
      return {
        type: 'error',
        file: filename,
        error: err.stack,
      };
    });
};

function applyTransform(contents, options) {
  const code = transform(contents, {}, options);

  return {
    skipped: !code,
    changed: code !== contents.source,
    source: code,
  };
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, contents) => {
      err ? reject(err) : resolve({ source: contents, path: filePath });
    });
  });
}

async function writeFile(filePath, output) {
  const { source } = output;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, source, 'utf8', (err) => {
      err ? reject(err) : resolve(output);
    });
  });
}
