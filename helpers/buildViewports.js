const constants = require('../configs/constants.js');
const parseFile = require('./parseFile.js');

/**
 * Extracts the information on viewports.json file and puts them in a js object.
 *
 * @return {Object} contentFile This object contains all viewports
 * and two general params.
 */
function getViewports() {
  const contentFile = parseFile(
    `${constants.CONFIG_PATH}${constants.VIEWPORTS_FILE}`
  );

  return contentFile || [];
}

/**
 * Builds an array only with the viewports entered by the user.
 *
 * @param {string|Array<string>} options This param is a string or an array of
 * strings with the viewports that are going to be added on the final array.
 * @return {Object} viewportsConfig This object containts the final viewports
 * and two params for each scenarios to be added on backstop.json.
 */
function buildViewports(options) {
  let viewports = [];
  const allViewports = getViewports();

  if (options) {
    let optionsArray = options;

    if (typeof optionsArray === 'string') {
      optionsArray = optionsArray.split(',');
    }

    optionsArray.forEach((option) => {
      const temp = allViewports.find(
        (viewport) =>
          viewport.label.trim().toUpperCase() === option.trim().toUpperCase()
      );
      if (temp) {
        viewports.push(temp);
      }
    });
  }

  if (viewports.length === 0) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `Invalid viewports '${options}'. Adding default viewports`
    );
    viewports = allViewports;
  }

  return viewports;
}

module.exports = buildViewports;
