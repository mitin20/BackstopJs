const fs = require('fs-extra');
const constants = require('./configs/constants.js');
const buildCookies = require('./helpers/buildCookies.js');
const buildPages = require('./helpers/buildPages.js');
const buildViewports = require('./helpers/buildViewports.js');
const parseFile = require('./helpers/parseFile.js');
const validateUrls = require('./helpers/validateUrls.js');

/**
 * Gets cookies with the correct domain.
 *
 * @param {string} testUrl This string corresponds to the test url.
 * @return {Array<Object>} cookies This array contains the cookies.
 */
function getCookies(testUrl) {
  console.log('\x1b[34m%s\x1b[0m', 'Reading cookies file');
  const cookies = buildCookies(testUrl);

  return cookies;
}

/**
 * Gets pages with locales (If they have).
 *
 * @return {Array<Object>} pages This array contains the pages concatened
 * with locales (If they have).
 */
function getPages() {
  console.log('\x1b[34m%s\x1b[0m', 'Reading pages file');
  const pages = buildPages();

  return pages;
}

/**
 * Gets viewports for BS regression.
 *
 * @param {string} viewportsOptions This contains the viewports
 * than user needs in his regression.
 * @return {Array<Object>} viewports This array contains the viewports for
 * BS regression.
 */
function getViewports(viewportsOptions) {
  console.log('\x1b[34m%s\x1b[0m', 'Reading viewports file');
  const viewports = buildViewports(viewportsOptions);

  return viewports;
}

/**
 * Gets base for BS regression.
 *
 * @return {Object} base This contains the base information
 * to add on backstop file.
 */
function getBase() {
  console.log('\x1b[34m%s\x1b[0m', 'Reading base file');
  const base = parseFile(`${constants.CONFIG_PATH}${constants.BASE_FILE}`);

  return base;
}

/**
 * Gets scenarios parameters to include them in each scenario for BS regression.
 *
 * @return {Object} scenariosData This contains the params to add
 * on each scneario.
 */
function getScenariosData() {
  console.log('\x1b[34m%s\x1b[0m', 'Reading scenarios data file');
  const scenariosData = parseFile(
    `${constants.CONFIG_PATH}${constants.SCENARIOS_DATA_FILE}`
  );

  return scenariosData;
}

/**
 * Sets viewports on backstopObj.
 *
 * @param {Object} backstopObj This contains the data to assemble
 * the backstop file with base information.
 * @param {Object} viewports This contains the viewports that will be
 * added to the returned object.
 * @return {Object} backstopObj This contains the base
 * information with viewports added.
 */
function setViewports(backstopObj, viewports) {
  console.log('\x1b[34m%s\x1b[0m', 'Adding viewports to backstop file');
  const backstopObjWithViewports = { ...backstopObj, viewports };

  return backstopObjWithViewports;
}

/**
 * Creates scenarios for backstop execution.
 *
 * @param {Array<Object>} pages This contains the data to assemble
 * the backstop file with base information.
 * @param {Object} backstopObj This contains the base data to assamble the
 * backstop file.
 * @param {string} referenceUrl This contains the url to compare against.
 * @param {string} testUrl This contains the url to test.
 * @param {Object} scenariosData This containts the params for each scenario.
 * @return {Object} backstopObj This contains the final information
 * to add on backstop file.
 */
function createScenarios(
  pages,
  backstopObj,
  referenceUrl,
  testUrl,
  scenariosData = {}
) {
  console.log('\x1b[34m%s\x1b[0m', 'Creating test scenarios');

  const scenarios = pages.map((page) => {
    const { name, locale, path, ...scenarioPageProps } = page;
    const label = page.name;

    return {
      ...scenariosData,
      ...scenarioPageProps,
      label,
      cookiePath: `${constants.CONFIG_PATH}${constants.COOKIES_FILE}`,
      url: `${testUrl}${path}`,
      referenceUrl: `${referenceUrl}${path}`,
    };
  });

  return { ...backstopObj, scenarios };
}

/**
 * Overwrites backstop file with final information.
 *
 * @param {Object} backstopFile This contains the final data to assemble
 * the backstop file.
 */
function overwriteBackstopFile(backstopFile) {
  console.log('\x1b[34m%s\x1b[0m', 'Overwriting Backstop file');
  fs.outputJSON(constants.BACKSTOP_CONFIG_FILE, backstopFile, { spaces: 2 });
}

/**
 * Overwrites cookies file with final information.
 *
 * @param {Object} cookiesFile This contains the final data to assemble
 * the backstop file.
 */
function overwriteCookiesFile(cookiesFile) {
  console.log('\x1b[34m%s\x1b[0m', 'Overwriting Backstop file');
  fs.outputJSON(
    `${constants.CONFIG_PATH}${constants.COOKIES_FILE}`,
    cookiesFile,
    { spaces: 2 }
  );
}

/**
 * Calls all the necessary functions to generate backstop file
 * with final information.
 *
 * @param {string} referenceUrl This contains reference url.
 * @param {string} testUrl This contains test url.
 * @param {string} viewportsOptions This contains viewports to test.
 */
function buildBackstopFile(referenceUrl, testUrl, viewportsOptions) {
  if (!validateUrls([referenceUrl, testUrl])) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      `There is at least one invalid URL "${referenceUrl}", "${testUrl}"`
    );

    return;
  }

  const cookies = getCookies(testUrl);
  const pages = getPages();
  const viewports = getViewports(viewportsOptions);
  const scenariosData = getScenariosData();
  let backstop = getBase();
  backstop = setViewports(backstop, viewports);
  backstop = createScenarios(
    pages,
    backstop,
    referenceUrl,
    testUrl,
    scenariosData
  );
  overwriteBackstopFile(backstop);
  overwriteCookiesFile(cookies);
  console.log('\x1b[34m%s\x1b[0m', 'Ready to execute Backstop Regression');
}

module.exports = buildBackstopFile;
