/**
 * Validates URLs.
 *
 * @param {Array<string>} urls Strings to be validated.
 * @return {boolean} if the urls are valid or not.
 */
function validateUrls(urls) {
  try {
    return urls.every((url) => !!new URL(url));
  } catch (error) {
    return false;
  }
}

module.exports = validateUrls;
