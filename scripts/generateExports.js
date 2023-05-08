const util = require('util');
const fs = require('fs');

const readdir = util.promisify(fs.readdir);

// Get all component types
const patternsTypes = [
  readdir(`${__dirname}/../src/components`),
  readdir(`${__dirname}/../src/layouts`),
  readdir(`${__dirname}/../src/utilities`),
];

//need to update scss file to be in new styles folder
// Create index.js files
const generateIndexFileForDefaults = async (name, patterns) => {
  console.log(`Generating index.js for ${name}...`);
  const generatedFile = `
/* Generated file */
${patterns.map(pattern => `import ${pattern} from './${pattern}';`).join('\n')}

export {\n${patterns.map(pattern => `${pattern},`).join('\n')}\n};
    `;

  fs.writeFile(
    `${__dirname}/../src/${name}/index.js`,
    generatedFile,
    writeError => {
      if (writeError) {
        console.error(
          `Oops! Something went wrong while generated exports for ${name}`,
        );

        process.exit(1);
      }
    },
  );
};

// Create index.js files
const generateIndexFileForNamed = async (name, patterns) => {
  console.log(`Generating index.js for ${name}...`);
  const generatedFile = `
/* Generated file */
${patterns.map(pattern => `export * from './${pattern}';`).join('\n')}
`;

  fs.writeFile(
    `${__dirname}/../src/${name}/index.js`,
    generatedFile,
    writeError => {
      if (writeError) {
        console.error(
          `Oops! Something went wrong while generated exports for ${name}`,
        );

        process.exit(1);
      }
    },
  );
};

// Create _styles.scss files
const generateStyleExports = async (
  name,
  patterns,
  fileName = '_styles.scss',
) => {
  console.log(`Generating ${fileName} for ${name}...`);
  const generatedFile = `
/* Generated file */
${patterns.map(pattern => `@import './${pattern}/${fileName}';`).join('\n')}
`;

  fs.writeFile(
    `${__dirname}/../src/${name}/${fileName}`,
    generatedFile,
    writeError => {
      if (writeError) {
        console.error(
          `Oops! Something went wrong while generated exports for ${name}`,
        );

        process.exit();
      }
    },
  );
};

Promise.all(patternsTypes).then(patterns => {
  // Filter out non folders
  const [
    Components,
    Layouts,
    Utilities,
  ] = patterns.map(pattern => pattern.filter(file => !file.includes('.')));
  generateIndexFileForNamed('Components', Components);
  generateIndexFileForNamed('Layouts', Layouts);
  generateIndexFileForDefaults('Utilities', Utilities);

  generateStyleExports('Components', Components);
  generateStyleExports('Layouts', Layouts);

  generateStyleExports('Layouts', Layouts, '_docs-styles.scss');
});
