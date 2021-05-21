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
  const weights = {
    100: 'font-thin',
    200: 'font-extralight',
    300: 'font-light',
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
    900: 'font-black',
  };

  return weights[decl.value];
};

const getLineHeight = (decl) => {
  const heights = {
    1: 'leading-none',
    1.25: 'leading-tight',
    1.375: 'leading-snug',
    1.5: 'leading-normal',
    1.625: 'leading-relaxed',
    2: 'leading-loose',
  };
  return heights[decl.value];
};

const getFlexWrap = (decl) => getCustomPrefix(decl, 'flex');
const getFlexGrow = (decl) => {
  return decl.value === '1' ? decl.prop : `${decl.prop}-${decl.value}`;
};

const getFlexShrink = (decl) => {
  return decl.value === '1' ? decl.prop : `${decl.prop}-${decl.value}`;
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
  getFlexWrap,
  getFlexGrow,
  getFlexShrink,
  getJustifyContent,
  getAlignItems,
  getTextAlign,
  getAlignContent,
  getWhiteSpace,
  getIsolation,
};
