const { getOptions: getCLIOptions } = require('codemod-cli');
const fs = require('fs');
const transform = require('./transform');

const postcss = require('postcss');
const parsel = require('parsel-js');

const { TAILWIND_CLASSES } = require('./constants');

function getOptions() {
  let options = {};
  let cliOptions = getCLIOptions();
  return { ...options, ...cliOptions };
}

function getSelectorType(selector) {
  const ast = parsel.parse(selector);
  return ast.type;
}
module.exports = function (file, parser, opts) {
  const options = opts || getOptions();

  // different selector types based on parsel
  const tailwindMappings = {
    classes: {},
    elements: {},
    combinators: {},
    compounds: {},
  };

  // filter only css files
  const cssFiles = fs.readdirSync(options.css).filter((dirContent) => dirContent.endsWith('.css'));
  cssFiles.forEach((css) => {
    const fileName = `${options.css}/${css}`;
    const root = postcss.parse(fs.readFileSync(fileName));

    root.nodes
      .filter((node) => node.type === 'rule')
      .forEach((node) => {
        const declarations = node.nodes;

        // Get the list of Tailwind classes
        const tw = declarations
          .map((decl) => {
            const prop = TAILWIND_CLASSES[decl.prop];
            return prop ? prop[decl.value] : '';
          })
          .join(' ');

        // TODO: what about partial mappings, we should log

        // Only create mapping if tailwind utilities exists
        const selectorType = getSelectorType(node.selector);
        if (tw !== ' ') {
          if (selectorType === 'class') {
            tailwindMappings.classes[node.selector] = tw.trimStart().trimEnd();
          } else if (selectorType === 'type') {
            tailwindMappings.elements[node.selector] = tw.trimStart().trimEnd();
          } else if (selectorType === 'complex') {
            tailwindMappings.combinators[node.selector] = tw.trimStart().trimEnd();
          } else {
            // remove new line chars from selectors
            const _selector = node.selector.replace('\n', '');
            tailwindMappings.compounds[_selector] = tw.trimStart().trimEnd();
          }
        } else {
          // log the class name and file name
          fs.appendFile('UNMAPPED_SELECTORS.txt', `${fileName} : ${node.selector}\n`, (err) => {
            if (err) throw err;
          });
        }
      });
  });

  try {
    //console.log(tailwindMappings);
    return transform(file, tailwindMappings);
  } catch (e) {
    throw new Error(
      `Transformation errored on file ${file.path}. Reason ${e}. Please report this in https://github.com/rajasegar/ember-tailwind-codemod/issues\n\nStack trace:\n${e.stack}`
    );
  }
};

module.exports.type = 'hbs';
