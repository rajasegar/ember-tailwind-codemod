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

module.exports = function (file) {
  const options = getOptions();
  const classMappings = {};

  const cssFiles = fs.readdirSync(options.css);
  cssFiles.forEach((css) => {
    const root = postcss.parse(fs.readFileSync(`${options.css}/${css}`));

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
        classMappings[node.selector] = tw;
      });
  });

  try {
    return transform(file, classMappings);
  } catch (e) {
    throw new Error(
      `Transformation errored on file ${file.path}. Reason ${e}. Please report this in https://github.com/rajasegar/ember-tailwind-codemod/issues\n\nStack trace:\n${e.stack}`
    );
  }
};
