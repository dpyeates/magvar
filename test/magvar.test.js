// @flow
'use strict';

const MagVar = require('../src/MagVar');

const mv = new MagVar();

var testdata = [
  [
    2015, 1, 1, 0.0, 80.0, 0.0, -3.85
  ],
  [
    2015, 1, 1, 0.0, 0.0, 120.0, 0.57
  ],
  [
    2015, 1, 1, 0.0, -80.0, 240.0, 69.81
  ],
  [
    2015, 1, 1, 100.0, 80.0, 0.0, -4.27
  ],
  [
    2015, 1, 1, 100.0, 0.0, 120.0, 0.56
  ],
  [
    2015, 1, 1, 100.0, -80.0, 240.0, 69.22
  ],
  [
    2017, 6, 1, 0.0, 80.0, 0.0, -2.79
  ],
  [
    2017, 6, 1, 0.0, 0.0, 120.0, 0.33
  ],
  [
    2017, 6, 1, 0.0, -80.0, 240.0, 69.59
  ],
  [
    2017, 6, 1, 100.0, 80.0, 0.0, -3.21
  ],
  [
    2017, 6, 1, 100.0, 0.0, 120.0, 0.33
  ],
  [
    2017, 6, 1, 100.0, -80.0, 240.0, 69.01
  ],
  [
    9999, 0, 0, 0, 0, 0, 0
  ]
];

describe("magvar tests", () => {

  test('can calculate Magvar correctly using documented test data', () => {
    let i = 0;
    while (testdata[i][0] != 9999) {
      var julian_days = mv.yymmdd_to_julian_days((testdata[i][0] - 2000), testdata[i][1], testdata[i][2]);
      var result = mv.CalculateMagVar(julian_days, testdata[i][4], testdata[i][5], testdata[i][3]);
      expect(result).toEqual(testdata[i][6]);
      i++;
    }
  });

  test('can calculate Magvar correctly spot point 1', () => {
    const lat = -9.449;
    const lon = 22.036;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(-1.51);
  });

  test('can calculate Magvar correctly spot point 2', () => {
    const lat = -33.724;
    const lon = 22.212;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(-26.63);
  });

  test('can calculate Magvar correctly spot point 3', () => {
    const lat = -26.431;
    const lon = -63.745;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(-8.39);
  });

  test('can calculate Magvar correctly spot point 4', () => {
    const lat = -27.059;
    const lon = 136.294;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(5.72);
  });

  test('can calculate Magvar correctly spot point 5', () => {
    const lat = 57.798;
    const lon = 121.352;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(-13.08);
  });

  test('can calculate Magvar correctly spot point 6', () => {
    const lat = 49.038;
    const lon = 9.731;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(2.68);
  });

  test('can calculate Magvar correctly spot point 7', () => {
    const lat = 37.996;
    const lon = -77.456;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(-10.40);
  });

  test('can calculate Magvar correctly spot point 8', () => {
    const lat = 54.674;
    const lon = -129.136;
    const alt = 0;
    const julian_days = mv.yymmdd_to_julian_days(18, 2, 2);
    const result = mv.CalculateMagVar(julian_days, lat, lon, alt);
    expect(result).toEqual(18.3);
  });
});
