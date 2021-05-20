const { transform } = require('ember-template-recast');
module.exports = function ({ source }, tailwind) {
  return transform({
    template: source,
    plugin() {
      return {
        ElementNode(node) {
          const classAttr = node.attributes.find((a) => a.name === 'class');
          if (classAttr) {
            const klass = `.${classAttr.value.chars}`;
            if (tailwind[klass]) {
              classAttr.value.chars = tailwind[klass];
            }
          }
        },
      };
    },
  }).code;
};

module.exports.type = 'hbs';
