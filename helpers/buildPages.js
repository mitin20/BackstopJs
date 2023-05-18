const constants = require('../configs/constants.js');
const buildViewports = require('./buildViewports.js');
const parseFile = require('./parseFile.js');

/**
 * Extracts the information on pages.json file
 * and put them in a js object.
 *
 * @return {Object} contentFile This object contains all information
 *      of pages.
 */
function getContentPagesFile() {
  return parseFile(`${constants.CONFIG_PATH}${constants.PAGES_FILE}`);
}

/**
 * Get the final pages by calling the method that processes
 * the information to return final Pages.
 *
 * @param {Object} contentPagesFile This object contains all information
 *      of pages.
 * @return {Array<Object>} finalPages This object contains the final pages
 *      to assemble in scenarios.
 */
function getFinalPages(contentPagesFile) {
  if (!contentPagesFile) throw new console.error('404 pages.json Not found');
  const localesBasePath = contentPagesFile.localization.basePath;
  const locales = contentPagesFile.localization.locales;
  const pages = contentPagesFile.pages;
  const finalPages = [];

  pages.forEach((page) => {
    processPage(page, page.locales || locales, localesBasePath, finalPages);
  });

  return finalPages;
}

/**
 * Call methods to validate and assemble final pages.
 *
 * @param {Object} page This object contains a page information.
 * @param {Array<string>} locales This is an array with string
 *      of each locale.
 * @param {string} localesBasePath This is an string used to
 *      generate final path with locales.
 * @param {Array} finalPages This is an empty array that
 *      will contains the final pages.
 */
function processPage(page, locales, localesBasePath, finalPages) {
  try {
    validatePage(page, locales);
    assembleFinalPages(page, locales, localesBasePath, finalPages);
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Call methods to validate the configuration on pages.json.
 *
 * @param {Object} page This object contains a page information.
 * @param {Array<string>} locales This is an array with string
 *      of each locale.
 */
function validatePage(page, locales) {
  checkPageName(page);
  checkMinAmountOfPaths(page, 1);
  checkNumOfPathsAssignToLocales(page, locales, 1);
}

/**
 * validate that the page has a name.
 *
 * @param {Object} page This object contains a page information.
 *      of pages.
 */
function checkPageName(page) {
  if (!page.name) throw new Error('Page without name, Interrupted execution');
}

/**
 * Validate that the page has at least one path.
 *
 * @param {Object} page This object contains a page information.
 * @param {number} minAmount This number represents the
 *      minimum value of paths.
 */
function checkMinAmountOfPaths(page, minAmount) {
  if (!page.paths || page.paths.length < minAmount)
    throw new Error('Page without paths, Interrupted execution');
}

/**
 * Validate the number of paths and put them in js object.
 *
 * @param {Object} page This object contains a page information.
 * @param {Array<string>} locales This contains the locale(s) for page.
 * @param {string} minAmount This represent the min of paths and locales
 *      of pages.
 */
function checkNumOfPathsAssignToLocales(page, locales, minAmount) {
  const areManyPaths = page.paths && page.paths.length > minAmount;
  const isDifferentToOneLocale = locales && locales.length > minAmount;
  if (areManyPaths && isDifferentToOneLocale)
    throw new Error(
      'If you have several paths there should have one locale, Interrupted execution'
    );
}

/**
 * Assembles the final stages of the pages depending on the configuration
 *
 * @param {Object} page This object contains all information of page
 * @param {Array<string>} locales This is an array with the locales per pages
 * @param {string} localesBasePath This is the initial path of the scenario
 * @param {Array<Object>} finalPages this is an array that
 *      of pages.
 */
function assembleFinalPages(page, locales, localesBasePath, finalPages) {
  const { name, paths, viewports: initialViewports } = page;
  const viewports = initialViewports ? buildViewports(initialViewports) : null;
  const basePage = {
    name: getFinalName(name, paths[0]),
    path: paths[0],
    ...(viewports && { viewports }),
  };
  const tempPages =
    locales.length === 0
      ? [basePage]
      : crossPathsWithLocales({
        name,
        paths,
        viewports,
        locales,
        localesBasePath,
      });
  finalPages.push(...tempPages);
}

/**
 * Cross paths with locales and return an array object.
 *
 * @return {Object} tempPages This array contains objects with the final path.
 */
function crossPathsWithLocales({
  name,
  paths,
  locales,
  localesBasePath,
  viewports,
} = {}) {
  const tempPages = [];
  paths.forEach((path) => {
    locales.forEach((locale) => {
      const finalPath = getFinalPath(locale, localesBasePath, path);
      const finalName = getFinalName(name, finalPath);
      tempPages.push({
        name: finalName,
        path: finalPath,
        ...(viewports && { viewports }),
      });
    });
  });

  return tempPages;
}

/**
 * Get the final path joining locale, localesBasePath and path.
 *
 * @param {string} locale This is the string for locale.
 * @param {string} localesBasePath This is the base of all paths.
 * @param {string} path This is the specific path for page
 *      of pages.
 * @return {string} This is a string with the final path.
 */
function getFinalPath(locale, localesBasePath, path) {
  localesBasePath = localesBasePath.replace(/{locales}/g, locale);

  return `${localesBasePath}${path}`;
}

/**
 * Get the final name of the scenario concatenated with the final path.
 *
 * @param {string} name This is the name of the page.
 * @param {string} path This is the final path of the page.
 * @return {string} finalName this is the final label for the scenario.
 */
function getFinalName(name, path) {
  const MAX_LENGTH_NAME = 210;
  let finalName = `${name}${path.replace('/intl/', ' - ')}`;

  if (finalName.length > MAX_LENGTH_NAME) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `Scenario label "${name}" too long. Slicing it to ${MAX_LENGTH_NAME}
       characters. Final label will be "${name}"`
    );
    finalName = finalName.substring(0, MAX_LENGTH_NAME);
  }

  return finalName;
}

/**
 * Make the calls to the other methods to extract the content of pages file and
 * concat each page with their corresponding locales.
 *
 * @return {Array<Object>} pages This is an array with all pages concatened with
 *     their locales.
 */
function buildPages() {
  const contentPagesFile = getContentPagesFile();
  const pages = getFinalPages(contentPagesFile);

  return pages;
}

module.exports = buildPages;
