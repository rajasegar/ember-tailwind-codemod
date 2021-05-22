const { getOptions: getCLIOptions } = require('codemod-cli');
const fs = require('fs');
const transform = require('./transform');

const postcss = require('postcss');

const identity = (value) => value;
const { TAILWIND_CLASSES, IDENTITY_CLASSES } = require('./constants');

function getOptions() {
  let options = {};
  let cliOptions = getCLIOptions();
  return { ...options, ...cliOptions };
}

module.exports = function (file, parser, opts) {
  const options = opts || getOptions();
  const classMappings = {};

  const cssFiles = fs.readdirSync(options.css);
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
            // if the class and property are same, return identity
            if (IDENTITY_CLASSES.includes(decl.prop)) {
              return identity(decl.value);
            } else {
              const f = TAILWIND_CLASSES[decl.prop];
              return f ? f(decl) : '';
            }
          })
          .join(' ');

        // TODO: what about partial mappings, we should log

        // Only create mapping if tailwind utilities exists
        if (tw !== ' ') {
          classMappings[node.selector] = tw.trimStart().trimEnd();
        } else {
          // log the class name and file name
          fs.appendFile('UNMAPPED_SELECTORS.txt', `${fileName} : ${node.selector}\n`, (err) => {
            if (err) throw err;
          });
        }
      });
  });

  try {
    //console.log(classMappings);
    return transform(file, classMappings);
  } catch (e) {
    throw new Error(
      `Transformation errored on file ${file.path}. Reason ${e}. Please report this in https://github.com/rajasegar/ember-tailwind-codemod/issues\n\nStack trace:\n${e.stack}`
    );
  }
};

module.exports.type = 'hbs';
