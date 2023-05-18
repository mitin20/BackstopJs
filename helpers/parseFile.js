const fs = require('fs');

/**
 * Reads and parses a file to json.
 *
 * @param {string} filePath The path of the file to be parsed.
 * @return {Object} contentFile This object contains all information of the file.
 */
function parseFile(filePath) {
  let contentFile;

  try {
    contentFile = fs.readFileSync(filePath);
    contentFile = JSON.parse(contentFile);
  } catch (error) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      `404 File ${filePath} not found or invalid JSON`
    );
  }

  return contentFile;
}

module.exports = parseFile;
