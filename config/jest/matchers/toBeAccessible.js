const aChecker = require('accessibility-checker');

async function toBeAccessible(node, label) {
  const results = await aChecker.getCompliance(node, label);
  const returnCode = aChecker.assertCompliance(results.report);

  if (returnCode === 0) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () => aChecker.stringifyResults(results.report),
  };
}

module.exports = toBeAccessible;
