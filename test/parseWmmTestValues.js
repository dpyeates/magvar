const fs = require('fs');
const path = require('path');

/**
 * Parse the official NOAA/NCEI WMM2025_TEST_VALUES.txt document.
 * https://www.ncei.noaa.gov/sites/default/files/2025-02/WMM2025_TEST_VALUES.txt
 *
 * Field order:
 *  1 Date (decimal year)
 *  2 Height above WGS84 ellipsoid (km)
 *  3 Geodetic Latitude (deg)
 *  4 Geodetic Longitude (deg)
 *  5 X (nT)  6 Y (nT)  7 Z (nT)  8 H (nT)  9 F (nT)
 * 10 Inclination (deg)  11 Declination (deg)  12 Grid Variation (deg)
 * 13 Xdot  14 Ydot  15 Zdot  16 Hdot  17 Fdot  (nT/yr)
 * 18 Idot  19 Ddot  (deg/yr)
 */
const parseWmmTestValues = (filePath) => {
  const text = fs.readFileSync(filePath, 'utf8');
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((line, index) => {
      const parts = line.split(/\s+/).map((token) =>
        token === 'NaN' ? Number.NaN : Number(token)
      );
      if (parts.length !== 19 || parts.slice(0, 11).some((n) => Number.isNaN(n))) {
        throw new Error(`Invalid WMM test row ${index + 1}: ${line}`);
      }
      const [
        decimalYear,
        heightKm,
        latitude,
        longitude,
        x,
        y,
        z,
        h,
        f,
        inclination,
        declination,
        gridVariation,
        xDot,
        yDot,
        zDot,
        hDot,
        fDot,
        iDot,
        dDot
      ] = parts;

      return {
        index: index + 1,
        decimalYear,
        heightKm,
        latitude,
        longitude,
        x,
        y,
        z,
        h,
        f,
        inclination,
        declination,
        gridVariation,
        xDot,
        yDot,
        zDot,
        hDot,
        fDot,
        iDot,
        dDot,
        label: `${decimalYear} lat=${latitude} lon=${longitude} h=${heightKm}km`
      };
    });
};

const OFFICIAL_TEST_VALUES_PATH = path.join(
  __dirname,
  'fixtures',
  'WMM2025_TEST_VALUES.txt'
);

module.exports = {
  parseWmmTestValues,
  OFFICIAL_TEST_VALUES_PATH,
  officialTestValues: parseWmmTestValues(OFFICIAL_TEST_VALUES_PATH)
};
