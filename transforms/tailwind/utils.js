'use strict';

const getBorderStyle = (decl) => getCustomPrefix(decl, 'border');

// Get the same prefix value as prop name
const getPrefix = (decl) => `${decl.prop}-${decl.value}`;

// Get the prefix value as a custom value
const getCustomPrefix = (decl, prefix) => `${prefix}-${decl.value}`;

function getPadding(decl) {
  if (decl.value === '0' || decl.value === '0px') {
    return 'p-0';
  } else return '';
}

function getOpacity(decl) {
  return `opacity-${Number(decl.value) * 100}`;
}

//function getColor(decl) {
//console.log(chroma(decl.value).rgb());
//return chroma(decl.value).rgb();
//}

const getObjectFit = (decl) => getCustomPrefix(decl, 'object');
const getObjectPosition = (decl) => getCustomPrefix(decl, 'object');

const getDisplay = (decl) => {
  if (decl.value === 'none') return 'hidden';
  return getPrefix(decl);
};

const getTextDecoration = (decl) => {
  if (decl.value === 'none') return 'no-underline';
  return decl.value;
};

const getFontWeight = (decl) => {
  const weights = {};

  return weights[decl.value];
};

const getLineHeight = (decl) => {
  const heights = {};
  return heights[decl.value];
};

const getJustifyContent = (decl) => {
  let value = decl.value.replace('flex-', '');
  value = value.replace('space-', '');
  return `justify-${value}`;
};

const getAlignItems = (decl) => {
  const value = decl.value.replace('flex-', '');
  return `items-${value}`;
};

const getAlignContent = (decl) => {
  let value = decl.value.replace('flex-', '');
  value = value.replace('space-', '');
  return `content-${value}`;
};

const getTextAlign = (decl) => {
  return getCustomPrefix(decl, 'text');
};

const getWhiteSpace = (decl) => getCustomPrefix(decl, 'whitespace');

const getIsolation = (decl) => {
  return decl.value === 'isolate' ? 'isoldate' : 'isolation-auto';
};

const getMargin = (decl) => {
  const valueMappings = {
    0: 'm-0',
    '0px': 'm-0',
  };
  return valueMappings[decl.value];
};

const getOverscrollBehavior = (decl) => getCustomPrefix(decl, 'overscroll');
const getOverscrollBehaviorX = (decl) => getCustomPrefix(decl, 'overscroll-x');
const getOverscrollBehaviorY = (decl) => getCustomPrefix(decl, 'overscroll-y');

const getVisibility = (decl) => {
  return decl.value === 'visible' ? 'visible' : 'invisible';
};

const getZIndex = (decl) => {
  const valueMappings = {};

  return valueMappings[decl.value];
};

module.exports = {
  getTextDecoration,
  getPrefix,
  getDisplay,
  getCustomPrefix,
  getObjectFit,
  getObjectPosition,
  getPadding,
  getOpacity,
  getBorderStyle,
  getFontWeight,
  getLineHeight,
  getJustifyContent,
  getAlignItems,
  getTextAlign,
  getAlignContent,
  getWhiteSpace,
  getIsolation,
  getMargin,
  getOverscrollBehavior,
  getOverscrollBehaviorY,
  getOverscrollBehaviorX,
  getVisibility,
  getZIndex,
};
