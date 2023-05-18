const validateUrls = require('./validateUrls.js');

describe('Validate URLs', () => {
  test('Should return true for valid URLs', () => {
    expect(validateUrls(['https://www.google.com'])).toBe(true);
    expect(validateUrls(['http://www.google.com'])).toBe(true);
    expect(validateUrls(['https://google.com'])).toBe(true);
    expect(validateUrls(['http://google.com'])).toBe(true);
    expect(validateUrls(['https://google.com/'])).toBe(true);
    expect(validateUrls(['https://google.com/test'])).toBe(true);
    expect(validateUrls(['https://google.com/?q=test'])).toBe(true);
  });

  test('Should return false for invalid URLs', () => {
    expect(validateUrls(['localhost'])).toBe(false);
    expect(validateUrls(['www.google.com'])).toBe(false);
    expect(validateUrls(['google.com'])).toBe(false);
    expect(validateUrls(['//www.google.com'])).toBe(false);
    expect(validateUrls(['//google.com'])).toBe(false);
  });
});
