const { transform } = require('ember-template-recast');
const fs = require('fs');

module.exports = function ({ source, path }, tailwind) {
  return transform({
    template: source,
    plugin(env) {
      let { builders: b } = env.syntax;
      return {
        ElementNode(node) {
          const classAttr = node.attributes.find((a) => a.name === 'class');
          if (classAttr) {
            const classes = classAttr.value.chars.split(' ');
            const newClass = [];
            classes.forEach((c) => {
              const selector = `.${c}`;
              if (tailwind.classes[selector]) {
                newClass.push(tailwind.classes[selector]);
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

            if (newClass.length > 0) {
              classAttr.value.chars = newClass.join(' ').trimEnd();
            }
          }

          // apply utilities for elements
          Object.keys(tailwind.elements).forEach((el) => {
            if (node.tag === el) {
              // add class attr
              if (classAttr) {
                classAttr.value.chars.concat([' ', tailwind.elements[node.tag]]);
              } else {
                node.attributes.push(b.attr('class', b.text(tailwind.elements[node.tag])));
              }
            }
          });

          // apply utilities for combinators
        },
      };
    },
  }).code;
};
