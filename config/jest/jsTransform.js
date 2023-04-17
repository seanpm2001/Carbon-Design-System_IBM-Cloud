const { createTransformer } = require('babel-jest');
const fs = require('fs');
const path = require('path');

const babelOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../.babelrc'), 'utf-8'),
);

// Get the index of the `preset-env` preset
const presetEnvIndex =
  babelOptions &&
  babelOptions.presets.findIndex(
    preset => Array.isArray(preset) && preset[0] === '@babel/preset-env',
  );

// If preset-env exists then check for the modules property
if (
  babelOptions.presets[presetEnvIndex] &&
  babelOptions.presets[presetEnvIndex][1]
) {
  // Remove the modules property
  delete babelOptions.presets[presetEnvIndex][1].modules;
}

module.exports = createTransformer(babelOptions);
