'use strict';

function getMinWidth(decl) {
  const hash = {
    0: 'min-w-0',
    '0px': 'min-w-0',
    '100%': 'min-w-full',
    'min-content': 'min-w-min',
    'max-content': 'min-w-max',
  };

  return hash[decl.value];
}

function getMinHeight(decl) {
  const hash = {
    0: 'min-h-0',
    '0px': 'min-h-0',
    '100%': 'min-h-full',
    '100vh': 'min-h-screen',
  };

  return hash[decl.value];
}

module.exports = {
  getMinWidth,
  getMinHeight,
};
