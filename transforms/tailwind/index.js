const { getOptions: getCLIOptions } = require('codemod-cli');
const fs = require('fs');
const transform = require('./transform');
const debug = require('debug')('etc');

const postcss = require('postcss');
const parsel = require('parsel-js');

//const { TAILWIND_CLASSES, getSpacingUtils, getBorderRadiusUtils } = require('tailwind-mappings');
const { getTailwindUtils } = require('tailwind-mappings');

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
            return getTailwindUtils(decl) || '';
          })
          .join(' ');

        // TODO: what about partial mappings, we should log

        // Only create mapping if tailwind utilities exists
        const selectorType = getSelectorType(node.selector);
        if (tw !== ' ') {
          const trimmedValue = tw.trimStart().trimEnd();
          switch (selectorType) {
            case 'class':
              tailwindMappings.classes[node.selector] = trimmedValue;
              break;
            case 'type':
              tailwindMappings.elements[node.selector] = trimmedValue;
              break;
            case 'complex':
              tailwindMappings.combinators[node.selector] = trimmedValue;
              break;

            default:
              {
                // remove new line chars from selectors
                const _selector = node.selector.replace(/\n/g, '');
                const selectors = _selector.split(',');
                selectors.forEach((s) => {
                  tailwindMappings.compounds[s.trimStart()] = trimmedValue;
                });
              }
              break;
          }
        } else {
          // log the class name and file name
          fs.appendFile('UNMAPPED_SELECTORS.txt', `${fileName} : ${node.selector}\n`, (err) => {
            if (err) throw err;
          });
        }
      });
  });

  const pseudoClasses = [':hover', ':active', ':focus'];

  // Copy pseudo classes to class mappings
  pseudoClasses.forEach((pseudo) => {
    Object.keys(tailwindMappings.compounds)
      .filter((compound) => compound.includes(pseudo))
      .forEach((compound) => {
        const className = compound.replace(pseudo, '');
        const utils = tailwindMappings.compounds[compound];
        const prefix = pseudo.replace(':', '') + ':';
        const hoverUtils = utils.split(' ').map((util) => `${prefix}${util}`);
        const classMapping = tailwindMappings.classes[className];
        if (classMapping) {
          const newMapping = [...classMapping.split(' '), ...hoverUtils];
          tailwindMappings.classes[className] = newMapping.join(' ');
        }
      });
  });

  // Copy class utils from compounds
  Object.keys(tailwindMappings.compounds)
    .filter((compound) => compound.startsWith('.'))
    .forEach((className) => {
      let classObj = tailwindMappings.classes[className];
      if (classObj) {
        classObj += ' ' + tailwindMappings.compounds[className];
        tailwindMappings.classes[className] = classObj;
      } else {
        tailwindMappings.classes[className] = tailwindMappings.compounds[className];
      }
    });

  // Copy element utils from compounds
  Object.keys(tailwindMappings.compounds)
    .filter((compound) => !compound.startsWith('.'))
    .forEach((element) => {
      let elementUtil = tailwindMappings.elements[element];
      if (elementUtil) {
        elementUtil += ' ' + tailwindMappings.compounds[element];
        tailwindMappings.elements[element] = elementUtil;
      } else {
        tailwindMappings.elements[element] = tailwindMappings.compounds[element];
      }
    });

  try {
    debug('Final Tailwind mappings:\n ', tailwindMappings);
    return transform(file, tailwindMappings);
  } catch (e) {
    throw new Error(
      `Transformation errored on file ${file.path}. Reason ${e}. Please report this in https://github.com/rajasegar/ember-tailwind-codemod/issues\n\nStack trace:\n${e.stack}`
    );
  }
};

module.exports.type = 'hbs';
