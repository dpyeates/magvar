// @flow
'use strict';

class MagVar {
  constructor() {
    const d = new Date();
    this.julian_days_now = this.yymmdd_to_julian_days(
      d.getFullYear() - 2000,
      d.getMonth(),
      d.getDate()
    );
    this.nmax = 12;
    this.a = 6378.137; /* semi-major axis [equatorial radius] of WGS84 ellipsoid */
    this.f = 1.0 / 298.257223563; /* inverse flattening IAU66 ellipsoid */
    this.b = 6356.7523142; /* semi-minor axis referenced to the WGS84 ellipsoid */
    this.r_0 = 6371.2; /* "mean radius" for spherical harmonic expansion */
    this.julian_days_2015 = 2457024;
    this.gnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ],
      [
        -29438.2, -1493.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ],
      [
        -2444.5, 3014.7, 1679.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ],
      [
        1351.8, -2351.6, 1223.6, 582.3, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ],
      [
        907.5, 814.8, 117.8, -335.6, 69.7, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ],
      [
        -232.9, 360.1, 191.7, -141.3, -157.2, 7.7, 0, 0, 0, 0, 0, 0, 0 // 5
      ],
      [
        69.4, 67.7, 72.3, -129.1, -28.4, 13.6, -70.3, 0, 0, 0, 0, 0, 0 // 6
      ],
      [
        81.7, -75.9, -7.1, 52.2, 15.0, 9.1, -3.0, 5.9, 0, 0, 0, 0, 0 // 7
      ],
      [
        24.2, 8.9, -16.9, -3.1, -20.7, 13.3, 11.6, -16.3, -2.1, 0, 0, 0, 0 // 8
      ],
      [
        5.5, 8.8, 3.0, -3.2, 0.6, -13.2, -0.1, 8.7, -9.1, -10.4, 0, 0, 0 // 9
      ],
      [
        -2.0, -6.1, 0.2, 0.6, -0.5, 1.8, -0.7, 2.2, 2.4, -1.8, -3.6, 0, 0 // 10
      ],
      [
        3.0, -1.4, -2.3, 2.1, -0.8, 0.6, -0.7, 0.1, 1.7, -0.2, 0.4, 3.5, 0 // 11
      ],
      [
        -2.0, -0.1, 0.5, 1.2, -0.9, 0.9, 0.1, 0.6, -0.4, -0.5, 0.2, -0.9, 0 // 12
      ]
    ];
    this.hnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ], [
        0, 4796.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ], [
        0, -2842.4, -638.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ], [
        0, -113.7, 246.5, -537.4, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ], [
        0, 283.3, -188.6, 180.7, -330.0, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ], [
        0, 46.9, 196.5, -119.9, 16.0, 100.6, 0, 0, 0, 0, 0, 0, 0 // 5
      ], [
        0, -20.1, 32.8, 59.1, -67.1, 8.1, 61.9, 0, 0, 0, 0, 0, 0 // 6
      ], [
        0, -54.3, -19.5, 6.0, 24.5, 3.5, -27.7, -2.9, 0, 0, 0, 0, 0 // 7
      ], [
        0, 10.1, -18.3, 13.3, -14.5, 16.2, 6.0, -9.2, 2.4, 0, 0, 0, 0 // 8
      ], [
        0, -21.8, 10.7, 11.8, -6.8, -6.9, 7.9, 1.0, -3.9, 8.5, 0, 0, 0 // 9
      ], [
        0, 3.3, -0.4, 4.6, 4.4, -7.9, -0.6, -4.2, -2.9, -1.1, -8.8, 0, 0 // 10
      ], [
        0, 0, 2.1, -0.6, -1.1, 0.7, -0.2, -2.1, -1.5, -2.6, -2.0, -2.3, 0 // 11
      ], [
        0, -1.0, 0.3, 1.8, -2.2, 0.3, 0.7, -0.1, 0.3, 0.2, -0.9, -0.2, 0.8 // 12
      ]
    ];
    this.gtnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ], [
        7.0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ], [
        -11, -6.2, 0.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ], [
        2.4, -5.7, 2, -11, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ], [
        -0.8, -0.9, -6.5, 5.2, -4.0, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ], [
        -0.3, 0.6, -0.8, 0.1, 1.2, 1.4, 0, 0, 0, 0, 0, 0, 0 // 5
      ], [
        -0.8, -0.5, -0.1, 1.6, -1.6, 0, 1.2, 0, 0, 0, 0, 0, 0 // 6
      ], [
        -0.3, -0.2, -0.3, 0.9, 0.1, -0.6, -0.9, 0.7, 0, 0, 0, 0, 0 // 7
      ], [
        -0.1, 0.2, -0.2, 0.5, -0.1, 0.4, 0.4, -0.1, 0.4, 0, 0, 0, 0 // 8
      ], [
        -0.1, -0.1, 0, 0.4, -0.4, 0, 0.3, 0, 0, -0.3, 0, 0, 0 // 9
      ], [
        0, 0, -0.1, 0.2, -0.1, -0.2, 0, -0.1, -0.2, -0.1, 0, 0, 0 // 10
      ], [
        0, 0, 0, 0, 0, -0.1, 0, 0, 0, -0.1, 0, -0.1, 0 // 11
      ], [
        0, 0, 0, 0, -0.1, 0, 0, 0, 0, 0, 0, 0, -0.1 //12
      ]
    ];
    this.htnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ], [
        0, -30.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ], [
        0, -29.6, -17.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ], [
        0, 6.5, -0.8, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ], [
        0, -0.4, 5.8, 3.8, -3.5, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ], [
        0, 0.2, 2.3, 0, 3.3, -0.6, 0, 0, 0, 0, 0, 0, 0 // 5
      ], [
        0, 0.3, -1.5, -1.2, 0.4, 0.2, 1.3, 0, 0, 0, 0, 0, 0 // 6
      ], [
        0, 0.6, 0.5, -0.8, -0.2, -1.1, 0.1, 0.2, 0, 0, 0, 0, 0 // 7
      ], [
        0, -0.4, 0.6, 0.1, 0.6, -0.2, -0.5, 0.1, 0, 0, 0, 0, 0 // 8
      ], [
        0, -0.3, -0.1, -0.4, 0.3, 0.1, 0, -0.1, 0.5, 0.2, 0, 0, 0 // 9
      ], [
        0, 0, 0.1, -0.2, 0.1, -0.1, 0.1, 0, -0.1, 0.2, 0, 0, 0 // 10
      ], [
        0, 0, 0.1, 0, 0.1, 0, 0, 0.1, 0, -0.1, 0, -0.1, 0 // 11
      ], [
        0, 0, 0, -0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, -0.1 // 12
      ]
    ];
    this.P = this._createArray(13, 13);
    this.DP = this._createArray(13, 13);
    this.gnm = this._createArray(13, 13);
    this.hnm = this._createArray(13, 13);
    this.sm = this._createArray(13);
    this.cm = this._createArray(13);
    this.root = this._createArray(13);
    this.roots = this._createArray(13, 13, 2);
    for (let n = 2; n <= this.nmax; n++) {
      this.root[n] = Math.sqrt((2.0 * n - 1) / (2.0 * n));
    }
    for (let m = 0; m <= this.nmax; m++) {
      const mm = m * m;
      for (let n = Math.max(m + 1, 2); n <= this.nmax; n++) {
        this.roots[m][n][0] = Math.sqrt((n - 1) * (n - 1) - mm);
        this.roots[m][n][1] = 1.0 / Math.sqrt(n * n - mm);
      }
    }
  }

  /**
   * get
   * Given a latitude and longitude position and optional height in metres above mean sea level,
   * return magnetic variation in degrees for the current date.
   * N and E latitude and longitude are positive values, S and W negative.
   * @param {number} lat: the latitude in degrees of the point we want to obtain the magnetic variation.
   * @param {number} lon: the longitude in degrees of the point we want to obtain the magnetic variation.
   * @param {number} h: the height in km above mean sea level of the point we want to obtain the magnetic variation.
   * @returns {number} magnetic variation at the given coordinates and height for the current date.
   */
  get(lat, lon, h = 0) {
    return this.calculateMagVar(this.julian_days_now, lat, lon, h / 100);
  }

  /**
   * calculateMagVar
   * Given a date in julian days, latitude, longitude and height, return variation (in degrees)
   * N and E latitude and longitude are positive values, South and West negative.
   * @param {number} julian_days: the current number of days since epoch 0h Jan 1, 1950.
   * @param {number} latIn: the latitude in degrees of the point we want to obtain the magnetic variation.
   * @param {number} lonIn: the longitude in degrees of the point we want to obtain the magnetic variation.
   * @param {number} h: the height in km above mean sea level of the point we want to obtain the magnetic variation.
   * @returns {number} magnetic variation at the given coordinates and height.
   */
  calculateMagVar(julian_days, latIn, lonIn, h) {
    /* output field B_r,B_th,B_phi,B_x,B_y,B_z */
    let n, m;
    let lat = this._toRadians(latIn);
    let lon = this._toRadians(lonIn);
    let sinlat = Math.sin(lat);
    let coslat = Math.cos(lat);
    let yearfrac, sr, r, theta, c, s, psi, fn, fn_0, B_r, B_theta, B_phi, X, Y, Z;
    let sinpsi, cospsi, inv_s;
    let mm = 0.0;

    /* convert to geocentric */
    /* sr is effective radius */
    sr = Math.sqrt(this.a * this.a * coslat * coslat + this.b * this.b * sinlat * sinlat);

    /* theta is geocentric co-latitude */
    theta = Math.atan2(
      coslat * (h * sr + this.a * this.a),
      sinlat * (h * sr + this.b * this.b)
    );

    /* r is geocentric radial distance */
    r =
      h * h +
      2.0 * h * sr +
      (this.a * this.a * this.a * this.a -
        (this.a * this.a * this.a * this.a - this.b * this.b * this.b * this.b) *
          sinlat *
          sinlat) /
        (this.a * this.a - (this.a * this.a - this.b * this.b) * sinlat * sinlat);
    r = Math.sqrt(r);
    c = Math.cos(theta);
    s = Math.sin(theta);

    /* protect against zero divide at geographic poles */
    inv_s = 1.0 / (s + (s === 0.0 ? 1.0e-8 : 0));

    /* zero out arrays */
    for (n = 0; n <= this.nmax; n++) {
      for (m = 0; m <= this.nmax; m++) {
        this.P[n][m] = 0.0;
        this.DP[n][m] = 0.0;
      }
    }

    /* diagonal elements */
    this.P[0][0] = 1.0;
    this.P[1][1] = s;
    this.DP[0][0] = 0.0;
    this.DP[1][1] = c;
    this.P[1][0] = c;
    this.DP[1][0] = -s;

    for (n = 2; n <= this.nmax; n++) {
      this.P[n][n] = this.P[n - 1][n - 1] * s * this.root[n];
      this.DP[n][n] = (this.DP[n - 1][n - 1] * s + this.P[n - 1][n - 1] * c) * this.root[n];
    }

    /* lower triangle */
    for (m = 0; m <= this.nmax; m++) {
      for (n = Math.max(m + 1, 2); n <= this.nmax; n++) {
        this.P[n][m] =
          (this.P[n - 1][m] * c * (2.0 * n - 1) - this.P[n - 2][m] * this.roots[m][n][0]) *
          this.roots[m][n][1];
        this.DP[n][m] =
          ((this.DP[n - 1][m] * c - this.P[n - 1][m] * s) * (2.0 * n - 1) -
            this.DP[n - 2][m] * this.roots[m][n][0]) *
          this.roots[m][n][1];
      }
    }

    yearfrac = (julian_days - this.julian_days_2015) / 365.25;
    for (n = 1; n <= this.nmax; n++) {
      for (m = 0; m <= this.nmax; m++) {
        this.gnm[n][m] = this.gnm_wmm2015[n][m] + yearfrac * this.gtnm_wmm2015[n][m];
        this.hnm[n][m] = this.hnm_wmm2015[n][m] + yearfrac * this.htnm_wmm2015[n][m];
      }
    }

    /* compute sm (sin(m lon) and cm (cos(m lon)) */
    for (m = 0; m <= this.nmax; m++) {
      this.sm[m] = Math.sin(m * lon);
      this.cm[m] = Math.cos(m * lon);
    }

    /* compute B fields */
    B_r = 0.0;
    B_theta = 0.0;
    B_phi = 0.0;
    fn_0 = this.r_0 / r;
    fn = fn_0 * fn_0;

    let c1_n = 0.0;
    let c2_n = 0.0;
    let c3_n = 0.0;
    let tmp = 0.0;
    for (n = 1; n <= this.nmax; n++) {
      c1_n = 0;
      c2_n = 0;
      c3_n = 0;
      for (m = 0; m <= n; m++) {
        tmp = this.gnm[n][m] * this.cm[m] + this.hnm[n][m] * this.sm[m];
        c1_n += tmp * this.P[n][m];
        c2_n += tmp * this.DP[n][m];
        c3_n += m * (this.gnm[n][m] * this.sm[m] - this.hnm[n][m] * this.cm[m]) * this.P[n][m];
      }
      fn *= fn_0;
      B_r += (n + 1) * c1_n * fn;
      B_theta -= c2_n * fn;
      B_phi += c3_n * fn * inv_s;
    }

    /* Find geodetic field components: */
    psi = theta - (Math.PI / 2.0 - lat);
    sinpsi = Math.sin(psi);
    cospsi = Math.cos(psi);
    X = -B_theta * cospsi - B_r * sinpsi;
    Y = B_phi;
    Z = B_theta * sinpsi - B_r * cospsi;
    /* find variation in radians */
    /* return zero variation at magnetic pole X=Y=0. */
    /* E is positive */
    return X !== 0.0 || Y !== 0.0
      ? this._roundToDecimalPlace(this._toDegrees(Math.atan2(Y, X)), 2)
      : 0.0;
  }

  /**
   * yymmdd_to_julian_days
   * Converts a given year, month and day to a Julian day using epoch 1950-2049.
   * @param {number} yy: requested year.
   * @param {number} mm: requested month of the year.
   * @param {number} dd: requested day of the month.
   * @returns {number} the julian date referenced to the epoch
   */
  yymmdd_to_julian_days(yy, mm, dd) {
    let jd = 0;
    yy = yy < 50 ? 2000 + yy : 1900 + yy;
    jd = dd - 32075 + (1461 * (yy + 4800 + (mm - 14) / 12)) / 4;
    jd = jd + (367 * (mm - 2 - ((mm - 14) / 12) * 12)) / 12;
    jd = jd - (3 * ((yy + 4900 + (mm - 14) / 12) / 100)) / 4;
    return Math.floor(jd);
  }

  _createArray(length) {
    let arr = new Array(length || 0),
      i = length;
    if (arguments.length > 1) {
      const args = Array.prototype.slice.call(arguments, 1);
      while (i--) {
        arr[length - 1 - i] = this._createArray.apply(this, args);
      }
    }
    return arr;
  }

  _toDegrees(rad) {
    return rad * (180 / Math.PI);
  }

  _toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  /* Round to a specified number of decimal places */
  _roundToDecimalPlace(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
}

Object.freeze(MagVar);

/**
 * instance
 * Create a singleton instance of the Magvar class
 */
const instance = new MagVar();

module.exports = instance;
module.exports.default = instance;
