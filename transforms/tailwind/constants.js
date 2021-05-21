'use strict';

const {
  getTextDecoration,
  getPrefix,
  getDisplay,
  getObjectFit,
  getPadding,
  getOpacity,
  getBorderStyle,
  getFontWeight,
  getLineHeight,
  getFlexWrap,
  getFlexGrow,
  getFlexShrink,
  getJustifyContent,
  getAlignItems,
  getTextAlign,
  getAlignContent,
  getWhiteSpace,
  getMargin,
  getOverscrollBehavior,
  getOverscrollBehaviorY,
  getOverscrollBehaviorX,
  getVisibility,
  getZIndex,
} = require('./utils');

const IDENTITY_CLASSES = ['position'];

const TAILWIND_CLASSES = {
  display: getDisplay,
  padding: getPadding,
  border: getPrefix,
  overflow: getPrefix,
  'border-style': getBorderStyle,
  opacity: getOpacity,
  float: getPrefix,
  clear: getPrefix,
  'object-fit': getObjectFit,
  'text-decoration': getTextDecoration,
  'font-weight': getFontWeight,
  'line-height': getLineHeight,
  'flex-wrap': getFlexWrap,
  'flex-grow': getFlexGrow,
  'flex-shrink': getFlexShrink,
  'justify-content': getJustifyContent,
  'align-items': getAlignItems,
  'text-align': getTextAlign,
  'align-content': getAlignContent,
  'white-space': getWhiteSpace,
  margin: getMargin,
  'overscroll-behavior': getOverscrollBehavior,
  'overscroll-behavior-y': getOverscrollBehaviorY,
  'overscroll-behavior-x': getOverscrollBehaviorX,
  visibility: getVisibility,
  'z-index': getZIndex,
};

module.exports = {
  IDENTITY_CLASSES,
  TAILWIND_CLASSES,
};
