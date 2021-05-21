'use strict';

// Get the same prefix value as prop name
const getPrefix = (decl) => `${decl.prop}-${decl.value}`;

// Get the prefix value as a custom value
const getCustomPrefix = (decl, prefix) => `${prefix}-${decl.value}`;

module.exports = {
  getPrefix,
  getCustomPrefix,
};
