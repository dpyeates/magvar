// @flow
'use strict';

const MagVar = require('../src/magvar');

const testdata = [
  [
    2015, 1, 1, 0, 80, 0, -3.90
  ],
  [
    2015, 1, 1, 0, 0, 120, 0.55
  ],
  [
    2015, 1, 1, 0, -80, -120, 69.81
  ],
  [
    2015, 1, 1, 100, 80, 0, -4.32
  ],
  [
    2015, 1, 1, 100, 0, 120, 0.54
  ],
  [
    2015, 1, 1, 100, -80, -120, 69.22
  ],
  [
    2017, 6, 1, 0, 80, 0, -2.62 
  ],
  [
    2017, 6, 1, 0, 0, 120, 0.37
  ],
  [
    2017, 6, 1, 0, -80, -120, 69.61 
  ],
  [
    2017, 6, 1, 100, 80, 0, -3.04
  ],
  [
    2017, 6, 1, 100, 0, 120, 0.36
  ],
  [
    2017, 6, 1, 100, -80, -120, 69.03
  ],
  [
    2019, 6, 1, 0.01, 30, -88.51, -1.97
  ],
  [
    2018, 1, 1, 0.5, -33.724, 22.212, -26.54
  ],
  [
    2018, 6, 1, 0.1, -26.431, -63.745, -8.49
  ],
  [
    2017, 1, 1, 0.5, -27.059, 136.294, 5.79
  ],
  [
    2018, 6, 1, 0.1, 57.798, 121.352, -13.24
  ],
  [
    2019, 9, 15, 1, 49.038, 9.731, 3.02
  ],
  [
    2019, 6, 1, 0.5, 37.996, -77.456, -10.34
  ],
  [
    2019, 9, 8, 0.1, 51.2, -0.3, -0.07
  ],
  [
    9999, 0, 0, 0, 0, 0, 0
  ]
];

describe("MagVar tests", () => {

   // you can use the online calculator at
   // https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml
   // to do any more testing...

   test('can calculate Magvar correctly', () => {
    let i = 0;
    while (testdata[i][0] != 9999) {
      const julian_days = MagVar.yymmdd_to_julian_days((testdata[i][0] - 2000), testdata[i][1], testdata[i][2]);
      const result = MagVar.calculateMagVar(julian_days, testdata[i][4], testdata[i][5], testdata[i][3]);
      expect(result).toEqual(testdata[i][6]);
      i++;
    }
  });

  test('can calculate Magvar correctly for the current date', () => {
    const lat = 51.2
    const lon = -0.3;
    const magVarNow = MagVar.calculateMagVar(MagVar.julian_days_now, lat, lon, 0);
    expect(MagVar.get(lat, lon)).toEqual(magVarNow);
  });

});
