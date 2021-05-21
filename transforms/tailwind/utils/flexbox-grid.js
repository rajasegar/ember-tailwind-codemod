'use strict';

const { getCustomPrefix } = require('./common');

function getFlexDirection(decl) {
  const hash = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
  };

  return hash[decl.value];
}

function getFlexWrap(decl) {
  return getCustomPrefix(decl, 'flex');
}

function getFlex(decl) {
  const hash = {
    '1 1 0%': 'flex-1',
    '1 1 auto': 'flex-auto',
    '0 1 auto': 'flex-iniital',
    none: 'flex-none',
  };

  return hash[decl.value];
}

function getOrder(decl) {
  const hash = {
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
    '-9999': 'order-first',
    9999: 'order-last',
    0: 'order-none',
  };
  return hash[decl.value];
}

module.exports = {
  getFlexDirection,
  getFlexWrap,
  getFlex,
  getOrder,
};
