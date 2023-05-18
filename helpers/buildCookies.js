const constants = require('../configs/constants.js');
const parseFile = require('./parseFile.js');

/**
 * Extracts the information on cookies.json file and puts them in a js object.
 *
 * @return {Object} contentFile This object contains all information of cookies.
 */
function getCookies() {
  const contentFile = parseFile(
    `${constants.CONFIG_PATH}${constants.COOKIES_FILE}`
  );

  return contentFile;
}

/**
 * Builds cookies.json file.
 *
 * @param {string} testUrl This string corresponds to the test url.
 * @return {Object} cookies This object containts the final cookies.
 */
function buildCookies(testUrl) {
  const cookies = getCookies();

  cookies.forEach((cookie) => {
    const url = new URL(testUrl);
    cookie.domain = url.host;
  });

  return cookies;
}

module.exports = buildCookies;
