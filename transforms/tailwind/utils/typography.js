'use strict';

function getFontVariantNumeric(decl) {
  const hash = {
    normal: 'normal-nums',
    ordinal: 'ordinal',
    'slashed-zero': 'slashed-zero',
    'lining-nums': 'lining-nums',
    'oldstyle-nums': 'oldstyle-nums',
    'proportional-nums': 'proportional-nums',
    'tabular-nums': 'tabular-nums',
    'diagonal-fractions': 'diagonal-fractions',
    'stacked-fractions': 'stacked-fractions',
  };

  return hash[decl.value];
}

module.exports = {
  getFontVariantNumeric,
};
