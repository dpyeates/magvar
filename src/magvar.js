const { gnmWmm, gtnmWmm, hnmWmm, htnmWmm, julianDaysCOF } = require('./WMMCOF2025');
const { deg2rad, rad2deg, zeroArray2D, roundToDecimalPlace, gregorianToJulian } = require('./utils');

const globe = {
  a: 6378.137, // semi-major axis [equatorial radius] of WGS84 ellipsoid
  b: 6356.7523142, // semi-minor axis referenced to the WGS84 ellipsoid
  r0: 6371.2 // "mean radius" for spherical harmonic expansion
};

const P = zeroArray2D(13, 13);
const DP = zeroArray2D(13, 13);
const gnm = zeroArray2D(13, 13);
const hnm = zeroArray2D(13, 13);
const sm = new Float32Array(13);
const cm = new Float32Array(13);
const root = new Float32Array(13);
const roots = zeroArray2D(13, 13).map(row => row.map(_ => new Float32Array(2)));

for (let n = 2; n <= 12; n++) {
  root[n] = Math.sqrt((2.0 * n - 1) / (2.0 * n));
}

for (let m = 0; m <= 12; m++) {
  const mm = m * m;
  for (let n = Math.max(m + 1, 2); n <= 12; n++) {
    roots[m][n][0] = Math.sqrt((n - 1) * (n - 1) - mm);
    roots[m][n][1] = 1.0 / Math.sqrt(n * n - mm);
  }
}

const d = new Date();
const julianDaysNow = gregorianToJulian(d.getFullYear(),d.getMonth(),d.getDay());

/**
 * magvar
 * Given a latitude and longitude position and optional height in metres above mean sea level,
 * return magnetic variation in degrees for the current date.
 * N and E latitude and longitude are positive values, S and W negative.
 * @param {number} latitude the latitude in degrees of the point we want to obtain the magnetic variation.
 * @param {number} longitude the longitude in degrees of the point we want to obtain the magnetic variation.
 * @param {number} altitude the height in km above mean sea level of the point we want to obtain the magnetic variation.
 * @returns {number} magnetic variation at the given coordinates and height for the current date.
 */
const magvar = (latitude, longitude, altitude = 0) => calculateMagVar(julianDaysNow, latitude, longitude, altitude);

/**
 * calculateMagVar
 * Given a date in julian days, latitude, longitude and height, return variation (in degrees)
 * N and E latitude and longitude are positive values, South and West negative.
 * @param {number} julianDays the current number of days since epoch.
 * @param {number} latitude the latitude in degrees of the point we want to obtain the magnetic variation.
 * @param {number} longitude the longitude in degrees of the point we want to obtain the magnetic variation.
 * @param {number} altitude the height in km above mean sea level of the point we want to obtain the magnetic variation.
 * @returns {number} magnetic variation at the given coordinates and height.
 */
const calculateMagVar = (julianDays, latitude, longitude, altitude = 0) => {
  const latRad = deg2rad(latitude);
  const lonRad = deg2rad(longitude);
  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const sr = Math.sqrt(globe.a ** 2 * cosLat ** 2 + globe.b ** 2 * sinLat ** 2);
  const theta = Math.atan2(cosLat * (altitude * sr + globe.a ** 2), sinLat * (altitude * sr + globe.b ** 2));
  const r = Math.sqrt(
    altitude ** 2 +
    2 * altitude * sr +
    (globe.a ** 4 - (globe.a ** 4 - globe.b ** 4) * sinLat ** 2) /
    (globe.a ** 2 - (globe.a ** 2 - globe.b ** 2) * sinLat ** 2)
  );
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const invS = 1 / (s + (s === 0 ? 1e-8 : 0));

  P[0][0] = 1.0;
  P[1][1] = s;
  DP[0][0] = 0.0;
  DP[1][1] = c;
  P[1][0] = c;
  DP[1][0] = -s;

  for (let n = 2; n <= 12; n++) {
    P[n][n] = P[n - 1][n - 1] * s * root[n];
    DP[n][n] = (DP[n - 1][n - 1] * s + P[n - 1][n - 1] * c) * root[n];
  }

  for (let m = 0; m <= 12; m++) {
    for (let n = Math.max(m + 1, 2); n <= 12; n++) {
      P[n][m] = (P[n - 1][m] * c * (2 * n - 1) - P[n - 2][m] * roots[m][n][0]) * roots[m][n][1];
      DP[n][m] = ((DP[n - 1][m] * c - P[n - 1][m] * s) * (2 * n - 1) - DP[n - 2][m] * roots[m][n][0]) *
        roots[m][n][1];
    }
  }

  const yearFrac = (julianDays - julianDaysCOF) / 365.25;
  for (let n = 1; n <= 12; n++) {
    for (let m = 0; m <= 12; m++) {
      gnm[n][m] = gnmWmm[n][m] + yearFrac * gtnmWmm[n][m];
      hnm[n][m] = hnmWmm[n][m] + yearFrac * htnmWmm[n][m];
    }
  }

  for (let m = 0; m <= 12; m++) {
    sm[m] = Math.sin(m * lonRad);
    cm[m] = Math.cos(m * lonRad);
  }

  let BR = 0.0;
  let BTheta = 0.0;
  let BPhi = 0.0;
  const fn0 = globe.r0 / r;
  let fn = fn0 ** 2;

  for (let n = 1; n <= 12; n++) {
    let c1n = 0;
    let c2n = 0;
    let c3n = 0;
    for (let m = 0; m <= n; m++) {
      const tmp = gnm[n][m] * cm[m] + hnm[n][m] * sm[m];
      c1n += tmp * P[n][m];
      c2n += tmp * DP[n][m];
      c3n += m * (gnm[n][m] * sm[m] - hnm[n][m] * cm[m]) * P[n][m];
    }
    fn *= fn0;
    BR += (n + 1) * c1n * fn;
    BTheta -= c2n * fn;
    BPhi += c3n * fn * invS;
  }

  const psi = theta - (Math.PI / 2 - latRad);
  const sinPsi = Math.sin(psi);
  const cosPsi = Math.cos(psi);
  const X = -BTheta * cosPsi - BR * sinPsi;
  const Y = BPhi;

  return X !== 0.0 || Y !== 0.0 ?
    roundToDecimalPlace(rad2deg(Math.atan2(Y, X)), 2) :
    0.0;
};

module.exports = {
  magvar,
  calculateMagVar,
  julianDaysNow
};
