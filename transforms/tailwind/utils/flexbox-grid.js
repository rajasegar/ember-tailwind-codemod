'use strict';

const { getCustomPrefix } = require('./common');

function getFlexDirection(decl) {
  const hash = {};

  return hash[decl.value];
}

function getFlexWrap(decl) {
  return getCustomPrefix(decl, 'flex');
}

function getFlex(decl) {
  const hash = {};

  return hash[decl.value];
}

function getFlexGrow(decl) {
  return decl.value === '1' ? decl.prop : `${decl.prop}-${decl.value}`;
}

function getOrder(decl) {
  const hash = {};
  return hash[decl.value];
}

function getGridTemplateColumns(decl) {
  const hash = {};

  return hash[decl.value];
}

function getGridAutoFlow(decl) {
  const hash = {};

  return hash[decl.value];
}

function getGridAutoColumns(decl) {
  const hash = {};

  return hash[decl.value];
}

function getGridAutoRows(decl) {
  const hash = {};

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
