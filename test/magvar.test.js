const {gregorianToJulian} = require('../src/utils');
const {magvar, calculateMagVar} = require('../src/magvar');
const {testData} = require('../src/WMMCOF2025');

describe('MagVar tests', () => {
  // you can use the online calculator at
  // http://www.geomag.bgs.ac.uk/data_service/models_compass/wmm_calc.html

  test('can calculate Magvar for a spot location', () => {
    const lat = 51.2;
    const lon = -0.3;
    expect(magvar(lat, lon)).toBeCloseTo(0.873, 1);
  });

  test('can calculate Magvar using the World Magnetic Model 2025-2030 test data', () => {
    testData.forEach((test) => {
      const year = Math.trunc(test[0]);
      const month = 12 * (test[0] - year);
      const julian_days = gregorianToJulian(year, month, 1);
      const height = test[1];
      const lat = test[2];
      const lon = test[3];
      const result = calculateMagVar(julian_days, lat, lon, height);
      expect(result).toBeCloseTo(test[4], 1);
    });
  });

  test('can calculate Magvar for the current date', () => {
    const lat = 51.2;
    const lon = -0.3;
    const d = new Date();
    const julianDaysNow = gregorianToJulian(d.getFullYear(), d.getMonth(), d.getDay());
    const magVarNow = calculateMagVar(julianDaysNow, lat, lon, 0);
    expect(magvar(lat, lon)).toBeCloseTo(magVarNow, 1);
  });
});
