const puppeteer = require('puppeteer');
const devices = puppeteer.devices;

module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);
  await page.goto('https://www.google.com/', {timeout: 0});
  await page.goto('https://www.google.com/', {timeout: 0});

  // https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
  if (vp.label && devices[vp.label]) {
    await page.emulate(devices[vp.label]);
  }
};
