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
    '0 1 auto': 'flex-initial',
    none: 'flex-none',
  };

  return hash[decl.value];
}

function getFlexGrow(decl) {
  return decl.value === '1' ? decl.prop : `${decl.prop}-${decl.value}`;
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

function getGridTemplateColumns(decl) {
  const hash = {
    'repeat(1, minmax(0, 1fr))': 'grid-cols-1',
    'repeat(2, minmax(0, 1fr))': 'grid-cols-2',
    'repeat(3, minmax(0, 1fr))': 'grid-cols-3',
    'repeat(4, minmax(0, 1fr))': 'grid-cols-4',
    'repeat(5, minmax(0, 1fr))': 'grid-cols-5',
    'repeat(6, minmax(0, 1fr))': 'grid-cols-6',
    'repeat(7, minmax(0, 1fr))': 'grid-cols-7',
    'repeat(8, minmax(0, 1fr))': 'grid-cols-8',
    'repeat(9, minmax(0, 1fr))': 'grid-cols-9',
    'repeat(10, minmax(0, 1fr))': 'grid-cols-10',
    'repeat(11, minmax(0, 1fr))': 'grid-cols-11',
    'repeat(12, minmax(0, 1fr))': 'grid-cols-12',
    none: 'grid-cols-none',
  };

  return hash[decl.value];
}

function getGridAutoFlow(decl) {
  const hash = {
    row: 'grid-flow-row',
    column: 'grid-flow-col',
    'row dense': 'grid-flow-row-dense',
    'column dense': 'grid-flow-col-dense',
  };

  return hash[decl.value];
}

function getGridAutoColumns(decl) {
  const hash = {
    auto: 'auto-cols-auto',
    'min-content': 'auto-cols-min',
    'max-content': 'auto-cols-max',
    'minmax(0, 1fr)': 'auto-cols-fr',
  };

  return hash[decl.value];
}

function getGridAutoRows(decl) {
  const hash = {
    auto: 'auto-rows-auto',
    'min-content': 'auto-rows-min',
    'max-content': 'auto-rows-max',
    'minmax(0, 1fr)': 'auto-rows-fr',
  };

  return hash[decl.value];
}

function getJustifyItems(decl) {
  const hash = {
    start: 'justify-items-start',
    end: 'justify-items-end',
    center: 'justify-items-center',
    stretch: 'justify-items-stretch',
  };

  return hash[decl.value];
}

function getJustifySelf(decl) {
  const hash = {
    auto: 'justify-self-auto',
    start: 'justify-self-start',
    end: 'justify-self-end',
    center: 'justify-self-center',
    stretch: 'justify-self-stretch',
  };

  return hash[decl.value];
}

function getAlignSelf(decl) {
  const hash = {
    auto: 'self-auto',
    start: 'self-start',
    end: 'self-end',
    center: 'self-center',
    stretch: 'self-stretch',
  };

  return hash[decl.value];
}

function getPlaceContent(decl) {
  const hash = {
    center: 'place-content-center',
    start: 'place-content-start',
    end: 'place-content-end',
    'space-between': 'place-content-between',
    'space-around': 'place-content-around',
    'space-evenly': 'place-content-evenly',
    stretch: 'place-content-stretch',
  };

  return hash[decl.value];
}

function getPlaceitems(decl) {
  const hash = {
    start: 'place-items-start',
    end: 'place-items-end',
    center: 'place-items-center',
    stretch: 'place-items-stretch',
  };

  return hash[decl.value];
}

function getPlaceSelf(decl) {
  const hash = {
    auto: 'place-self-auto',
    start: 'place-self-start',
    end: 'place-self-end',
    center: 'place-self-center',
    stretch: 'place-self-stretch',
  };

  return hash[decl.value];
}

function getFlexShrink(decl) {
  return decl.value === '1' ? decl.prop : `${decl.prop}-${decl.value}`;
}

module.exports = {
  getFlexDirection,
  getFlexWrap,
  getFlex,
  getFlexGrow,
  getFlexShrink,
  getOrder,
  getGridAutoFlow,
  getGridAutoColumns,
  getGridAutoRows,
  getJustifyItems,
  getJustifySelf,
  getAlignSelf,
  getPlaceContent,
  getPlaceitems,
  getPlaceSelf,
  getGridTemplateColumns,
};
