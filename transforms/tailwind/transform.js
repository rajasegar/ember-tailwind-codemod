const { transform } = require('ember-template-recast');
const fs = require('fs');

module.exports = function ({ source, path }, tailwind) {
  const combinatorsVisited = Object.keys(tailwind.combinators).map((combinator) => {
    const visited = [];
    combinator.split(' ').forEach((s) => {
      visited.push({
        selector: s,
        visited: false,
      });
    });

    return {
      combinator,
      visited,
    };
  });

  return transform({
    template: source,
    plugin(env) {
      let { builders: b } = env.syntax;
      return {
        ElementNode: {
          enter(node) {
            const classAttr = node.attributes.find((a) => a.name === 'class');
            if (classAttr) {
              let classes = [];
              if (classAttr.value.type === 'TextNode') {
                classes = classAttr.value.chars.split(' ');
              } else {
                // Assuming it is a ConcatStatement here, might be wrong
                classes = classAttr.value.parts
                  .filter((p) => p.type === 'TextNode')
                  .map((p) => p.chars);
              }
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
                // Retain old classnames later for applying compounds
                node.attributes.push(b.attr('data-old-class', b.text(classAttr.value.chars)));
                classAttr.value.chars = newClass.join(' ').trimEnd();
              }
            }

            // apply utilities for elements
            Object.keys(tailwind.elements).forEach((el) => {
              if (node.tag === el) {
                // add class attr
                if (classAttr) {
                  if (classAttr.value.type === 'TextNode') {
                    classAttr.value.chars.concat([' ', tailwind.elements[node.tag]]);
                  } else {
                    classAttr.value.parts.push(b.text(tailwind.elements[node.tag]));
                  }
                } else {
                  node.attributes.push(b.attr('class', b.text(tailwind.elements[node.tag])));
                }
              }
            });

            // apply utilities for combinators

            combinatorsVisited.forEach((c) => {
              debugger;
              markVisited(c.visited, node);
              if (isAllVisited(c.visited)) {
                const lastSelector = c.visited[c.visited.length - 1].selector;
                if (classMatch(node, lastSelector) || node.tag === lastSelector) {
                  if (tailwind.combinators[c.combinator]) {
                    node.attributes = [b.attr('class', b.text(tailwind.combinators[c.combinator]))];
                  }
                }
              }
            });

            // remove data-old-class
            node.attributes = node.attributes.filter((a) => a.name !== 'data-old-class');
          },
          exit(node) {
            combinatorsVisited.forEach((c) => {
              unmarkVisited(c.visited, node);
            });
          },
        },
      };
    },
  }).code;
};

function isAllVisited(visited) {
  return visited.every((v) => v.visited);
}

function classMatch(node, selector) {
  const classAttr =
    node.attributes.find((a) => a.name === 'data-old-class') ||
    node.attributes.find((a) => a.name === 'class');
  let values = [];
  if (classAttr) {
    if (classAttr.value.type === 'TextNode') {
      values = classAttr.value.chars.split(' ');
    } else {
      values = classAttr.value.parts.filter((p) => p.type === 'TextNode').map((p) => p.chars);
    }
  }
  const className = selector.replace('.', '');
  return values && values.includes(className);
}

function markVisited(visited, node) {
  visited
    .filter((v) => !v.visited)
    .forEach((v) => {
      if (v.selector.startsWith('.')) {
        if (classMatch(node, v.selector)) {
          v.visited = true;
        }
      } else {
        if (v.selector === node.tag) {
          v.visited = true;
        }
      }
    });
}

function unmarkVisited(visited, node) {
  visited
    .filter((v) => !v.visited)
    .forEach((v) => {
      if (v.selector.startsWith('.')) {
        if (classMatch(node, v.selector)) {
          v.visited = false;
        }
      } else {
        if (v.selector === node.tag) {
          v.visited = false;
        }
      }
    });
}
