/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
const buildBackstopFile = require('./buildBackstopFile.js');
/**
 * Triggers all the logic to assemble the backstop file.
 *
 * @param {string} referenceUrl This contains reference url.
 * @param {string} testUrl This contains test url.
 * @param {string} viewports This contains the viewports
 * than user needs in his regression.
 */
buildBackstopFile(
  'https://www.google.com/',
  'https://www.google.com/',
  'xl'
);
