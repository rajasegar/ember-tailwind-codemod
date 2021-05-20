const utils = require('./utils');

const IDENTITY_CLASSES = ['position'];

const TAILWIND_CLASSES = {
  display: utils.getDisplay,
  padding: utils.getPadding,
  border: utils.getPrefix,
  overflow: utils.getPrefix,
  'border-style': utils.getBorderStyle,
  opacity: utils.getOpacity,
  float: utils.getPrefix,
  clear: utils.getPrefix,
  'object-fit': utils.getObjectFit,
  'text-decoration': utils.getTextDecoration,
  'font-weight': utils.getFontWeight,
  'line-height': utils.getLineHeight,
  'flex-wrap': utils.getFlexWrap,
  'flex-grow': utils.getFlexGrow,
  'flex-shrink': utils.getFlexShrink,
  'justify-content': utils.getJustifyContent,
  'align-items': utils.getAlignItems,
  'text-align': utils.getTextAlign,
  'align-content': utils.getAlignContent,
  'white-space': utils.getWhiteSpace,
};

module.exports = {
  IDENTITY_CLASSES,
  TAILWIND_CLASSES,
};
