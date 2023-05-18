const buildPages = require('./buildPages.js');

describe('Build Pages data', () => {
  test('Should return pages with path', () => {
    const pages = buildPages();
    pages.forEach((page) => {
      expect(page.path).toBeDefined();
    });
  });

  // test('Should return pages with paths', () => {
  //   const pages = buildPages();
  //   pages.forEach((page) => {
  //     expect(page.paths).toBeDefined();
  //   });
  // });
});
