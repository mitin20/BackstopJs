const buildCookies = require('./buildCookies.js');

describe('Build Cookies data', () => {
  test('Should return cookies with the new domain', () => {
    const domain = 'https://www.google.com';
    const cookies = buildCookies(domain);
    cookies.forEach((cookie) => {
      expect(cookie.domain).toBe('www.google.com');
      expect(cookie.value).toBeDefined();
    });
  });
});
