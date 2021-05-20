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
            const classes = classAttr.value.chars.split(' ');
            const newClass = [];
            classes.forEach((c) => {
              const klass = `.${c}`;
              if (tailwind[klass]) {
                //classAttr.value.chars = tailwind[klass];
                newClass.push(tailwind[klass]);
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
            });

            if (newClass.length) {
              classAttr.value.chars = newClass.join(' ').trimEnd();
            }
          }
        },
      };
    },
  }).code;
};

module.exports.type = 'hbs';
