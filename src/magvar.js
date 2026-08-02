const {
  gnmWmm,
  gtnmWmm,
  hnmWmm,
  htnmWmm,
  julianDaysCOF,
  MODEL_EPOCH,
  MODEL_VALID_UNTIL
} = require('./WMMCOF2025');
const {
  deg2rad,
  rad2deg,
  zeroArray2D,
  roundToDecimalPlace,
  resolveDecimalYear
} = require('./utils');

const MAX_N = 12;
const SIZE = MAX_N + 1;

const globe = {
  a: 6378.137, // semi-major axis [equatorial radius] of WGS84 ellipsoid (km)
  b: 6356.7523142, // semi-minor axis referenced to the WGS84 ellipsoid (km)
  r0: 6371.2 // "mean radius" for spherical harmonic expansion (km)
};

// Scratch arrays reused across calls (single-threaded JS; not worker-safe).
const P = zeroArray2D(SIZE, SIZE);
const DP = zeroArray2D(SIZE, SIZE);
const gnm = zeroArray2D(SIZE, SIZE);
const hnm = zeroArray2D(SIZE, SIZE);
const sm = new Array(SIZE).fill(0);
const cm = new Array(SIZE).fill(0);
const root = new Array(SIZE).fill(0);
const roots = zeroArray2D(SIZE, SIZE).map((row) => row.map(() => [0, 0]));

for (let n = 2; n <= MAX_N; n++) {
  root[n] = Math.sqrt((2.0 * n - 1) / (2.0 * n));
}

for (let m = 0; m <= MAX_N; m++) {
  const mm = m * m;
  for (let n = Math.max(m + 1, 2); n <= MAX_N; n++) {
    roots[m][n][0] = Math.sqrt((n - 1) * (n - 1) - mm);
    roots[m][n][1] = 1.0 / Math.sqrt(n * n - mm);
  }
}

let cachedDecimalYear = Number.NaN;
let warnedOutsideValidity = false;

const warnIfOutsideValidity = (decimalYear) => {
  if (
    !warnedOutsideValidity &&
    (decimalYear < MODEL_EPOCH || decimalYear >= MODEL_VALID_UNTIL)
  ) {
    warnedOutsideValidity = true;
    console.warn(
      `magvar: decimal year ${decimalYear} is outside the WMM ${MODEL_EPOCH}-${MODEL_VALID_UNTIL} validity period; results may be inaccurate.`
    );
  }
};

const updateSecularVariation = (decimalYear) => {
  if (decimalYear === cachedDecimalYear) {
    return;
  }
  cachedDecimalYear = decimalYear;
  const yearFrac = decimalYear - MODEL_EPOCH;
  for (let n = 1; n <= MAX_N; n++) {
    for (let m = 0; m <= n; m++) {
      gnm[n][m] = gnmWmm[n][m] + yearFrac * gtnmWmm[n][m];
      hnm[n][m] = hnmWmm[n][m] + yearFrac * htnmWmm[n][m];
    }
  }
};

/**
 * Compute geomagnetic field components for a decimal year.
 * @param {number} decimalYear WMM decimal year (e.g. 2025.0, 2027.5)
 * @param {number} latitude geodetic latitude in degrees (N positive)
 * @param {number} longitude geodetic longitude in degrees (E positive)
 * @param {number} [altitude=0] height in kilometers above mean sea level
 * @returns {{
 *   declination: number,
 *   inclination: number,
 *   x: number,
 *   y: number,
 *   z: number,
 *   h: number,
 *   f: number,
 *   decimalYear: number
 * }} field components (angles in degrees, intensities in nT)
 */
const calculateMagneticField = (decimalYear, latitude, longitude, altitude = 0) => {
  warnIfOutsideValidity(decimalYear);
  updateSecularVariation(decimalYear);

  const latRad = deg2rad(latitude);
  const lonRad = deg2rad(longitude);
  const sinLat = Math.sin(latRad);
  const cosLat = Math.cos(latRad);
  const sr = Math.sqrt(globe.a ** 2 * cosLat ** 2 + globe.b ** 2 * sinLat ** 2);
  const theta = Math.atan2(
    cosLat * (altitude * sr + globe.a ** 2),
    sinLat * (altitude * sr + globe.b ** 2)
  );
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

  for (let n = 2; n <= MAX_N; n++) {
    P[n][n] = P[n - 1][n - 1] * s * root[n];
    DP[n][n] = (DP[n - 1][n - 1] * s + P[n - 1][n - 1] * c) * root[n];
  }

  for (let m = 0; m <= MAX_N; m++) {
    for (let n = Math.max(m + 1, 2); n <= MAX_N; n++) {
      P[n][m] =
        (P[n - 1][m] * c * (2 * n - 1) - P[n - 2][m] * roots[m][n][0]) *
        roots[m][n][1];
      DP[n][m] =
        ((DP[n - 1][m] * c - P[n - 1][m] * s) * (2 * n - 1) -
          DP[n - 2][m] * roots[m][n][0]) *
        roots[m][n][1];
    }
  }

  for (let m = 0; m <= MAX_N; m++) {
    sm[m] = Math.sin(m * lonRad);
    cm[m] = Math.cos(m * lonRad);
  }

  let BR = 0.0;
  let BTheta = 0.0;
  let BPhi = 0.0;
  const fn0 = globe.r0 / r;
  let fn = fn0 ** 2;

  for (let n = 1; n <= MAX_N; n++) {
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
  const x = -BTheta * cosPsi - BR * sinPsi;
  const y = BPhi;
  const z = BTheta * sinPsi - BR * cosPsi;
  const h = Math.hypot(x, y);
  const f = Math.hypot(h, z);
  const declination =
    x !== 0.0 || y !== 0.0 ? rad2deg(Math.atan2(y, x)) : 0.0;
  const inclination = h !== 0.0 || z !== 0.0 ? rad2deg(Math.atan2(z, h)) : 0.0;

  return {
    declination: roundToDecimalPlace(declination, 2),
    inclination: roundToDecimalPlace(inclination, 2),
    x: roundToDecimalPlace(x, 1),
    y: roundToDecimalPlace(y, 1),
    z: roundToDecimalPlace(z, 1),
    h: roundToDecimalPlace(h, 1),
    f: roundToDecimalPlace(f, 1),
    decimalYear
  };
};

/**
 * Given a decimal year, latitude, longitude and optional height in km above MSL,
 * return magnetic variation (declination) in degrees.
 * @param {number} decimalYear
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} [altitude=0] height in kilometers above mean sea level
 * @returns {number} magnetic variation in degrees
 */
const calculateMagVarForDecimalYear = (
  decimalYear,
  latitude,
  longitude,
  altitude = 0
) => calculateMagneticField(decimalYear, latitude, longitude, altitude).declination;

/**
 * Given a Julian day, latitude, longitude and optional height in km above MSL,
 * return magnetic variation (declination) in degrees.
 * Prefer `magvar` or `calculateMagVarForDecimalYear` for new code.
 * @param {number} julianDays Julian Day Number
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} [altitude=0] height in kilometers above mean sea level
 * @returns {number} magnetic variation in degrees
 */
const calculateMagVar = (julianDays, latitude, longitude, altitude = 0) => {
  const decimalYear = MODEL_EPOCH + (julianDays - julianDaysCOF) / 365.25;
  return calculateMagVarForDecimalYear(
    decimalYear,
    latitude,
    longitude,
    altitude
  );
};

/**
 * Magnetic variation (declination) for a location.
 * North and east latitudes/longitudes are positive; south and west are negative.
 * @param {number} latitude degrees
 * @param {number} longitude degrees
 * @param {number} [altitude=0] height in kilometers above mean sea level
 * @param {number|Date} [when] decimal year (e.g. 2026.5) or Date; defaults to current UTC time
 * @returns {number} magnetic variation in degrees
 */
const magvar = (latitude, longitude, altitude = 0, when) =>
  calculateMagVarForDecimalYear(
    resolveDecimalYear(when),
    latitude,
    longitude,
    altitude
  );

/**
 * Full geomagnetic field for a location.
 * @param {number} latitude degrees
 * @param {number} longitude degrees
 * @param {number} [altitude=0] height in kilometers above mean sea level
 * @param {number|Date} [when] decimal year or Date; defaults to current UTC time
 */
const magneticField = (latitude, longitude, altitude = 0, when) =>
  calculateMagneticField(
    resolveDecimalYear(when),
    latitude,
    longitude,
    altitude
  );

module.exports = {
  magvar,
  magneticField,
  calculateMagVar,
  calculateMagVarForDecimalYear,
  calculateMagneticField,
  MODEL_EPOCH,
  MODEL_VALID_UNTIL
};
