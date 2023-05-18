const buildViewports = require('./buildViewports.js');

describe('Build Viewports data', () => {
  test('Should return all viewports if no param is passed', () => {
    const viewports = buildViewports();
    expect(viewports).toMatchObject([
      { label: 'S', width: 360, height: 767 },
      { label: 'M', width: 768, height: 991 },
      { label: 'L', width: 768, height: 991 },
      { label: 'XL', width: 768, height: 991 },
    ]);
  });

  test('Should return viewports passed as param', () => {
    const viewports = buildViewports('s');
    expect(viewports).toMatchObject([{ label: 'S', width: 360, height: 767 }]);
  });
});
