const { transform } = require('ember-template-recast');
const fs = require('fs');

module.exports = function ({ source, path }, tailwind) {
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
            } else {
              // log the component name and file name
              fs.appendFile(
                'UNCHANGED_COMPONENTS.txt',
                `${path} : ${node.tag} at line ${classAttr.loc.start.line}, ${classAttr.loc.start.column}\n`,
                (err) => {
                  if (err) throw err;
                }
              );
            }
          }
        },
      };
    },
  }).code;
};

module.exports.type = 'hbs';
