// @flow
'use strict';

Date.prototype.getJulian = function() {
  return this / 86400000 - this.getTimezoneOffset() / 1440 + 2440587.5;
};

class MagVar {
  constructor() {
    const d = new Date();
    this.julian_days_now = this.yymmdd_to_julian_days(
        d.getFullYear(),
        d.getMonth(),
        d.getDay()
    );
    this.nmax = 12;
    this.a = 6378.137; /* semi-major axis [equatorial radius] of WGS84 ellipsoid */
    this.f = 1.0 / 298.257223563; /* inverse flattening IAU66 ellipsoid */
    this.b = 6356.7523142; /* semi-minor axis referenced to the WGS84 ellipsoid */
    this.r_0 = 6371.2; /* "mean radius" for spherical harmonic expansion */
    this.julian_days_2020 = 2458850;
    this.gnm_wmm2020 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ],
      [
        -29404.5, -1450.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ],
      [
        -2500.0, 2982.0, 1676.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ],
      [
        1363.9, -2381.0, 1236.2, 525.7, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ],
      [
        903.1, 809.4, 86.2, -309.4, 47.9, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ],
      [
        -234.4, 363.1, 187.8, -140.7, -151.2, 13.7, 0, 0, 0, 0, 0, 0, 0 // 5
      ],
      [
        65.9, 65.6, 73.0, -121.5, -36.2, 13.5, -64.7, 0, 0, 0, 0, 0, 0 // 6
      ],
      [
        80.6, -76.8, -8.3, 56.5, 15.8, 6.4, -7.2, 9.8, 0, 0, 0, 0, 0 // 7
      ],
      [
        23.6, 9.8, -17.5, -0.4, -21.1, 15.3, 13.7, -16.5, -0.3, 0, 0, 0, 0 // 8
      ],
      [
        5.0, 8.2, 2.9, -1.4, -1.1, -13.3, 1.1, 8.9, -9.3, -11.9, 0, 0, 0 // 9
      ],
      [
        -1.9, -6.2, -0.1, 1.7, -0.9, 0.6, -0.9, 1.9, 1.4, -2.4, -3.9, 0, 0 // 10
      ],
      [
        3.0, -1.4, -2.5, 2.4, -0.9, 0.3, -0.7, -0.1, 1.4, -0.6, 0.2, 3.1, 0 // 11
      ],
      [
        -2.0, -0.1, 0.5, 1.3, -1.2, 0.7, 0.3, 0.5, -0.2, -0.5, 0.1, -1.1, -0.3 // 12
      ]
    ];
    this.hnm_wmm2020 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ], [
        0, 4652.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ], [
        0, -2991.6, -734.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ], [
        0, -82.2, 241.8, -542.9, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ], [
        0, 282.0, -158.4, 199.8, -350.1, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ], [
        0, 47.7, 208.4, -121.3, 32.2, 99.1, 0, 0, 0, 0, 0, 0, 0 // 5
      ], [
        0, -19.1, 25.0, 52.7, -64.4, 9.0, 68.1, 0, 0, 0, 0, 0, 0 // 6
      ], [
        0, -51.4, -16.8, 2.3, 23.5, -2.2, -27.2, -1.9, 0, 0, 0, 0, 0 // 7
      ], [
        0, 8.4, -15.3, 12.8, -11.8, 14.9, 3.6, -6.9, 2.8, 0, 0, 0, 0 // 8
      ], [
        0, -23.3, 11.1, 9.8, -5.1, -6.2, 7.8, 0.4, -1.5, 9.7, 0, 0, 0 // 9
      ], [
        0, 3.4, -0.2, 3.5, 4.8, -8.6, -0.1, -4.2, -3.4, -0.1, -8.8, 0, 0 // 10
      ], [
        0, -0, 2.6, -0.5, -0.4, 0.6, -0.2, -1.7, -1.6, -3.0, -2.0, -2.6, 0 // 11
      ], [
        0, -1.2, 0.5, 1.3, -1.8, 0.1, 0.7, -0.1, 0.6, 0.2, -0.9, -0.0, 0.5 // 12
      ]
    ];
    this.gtnm_wmm2020 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ], [
        6.7, 7.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ], [
        -11.5, -7.1, -2.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ], [
        2.8, -6.2, 3.4, -12.2, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ], [
        -1.1, -1.6, -6.0, 5.4, -5.5, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ], [
        -0.3, 0.6, -0.7, 0.1, 1.2, 1.0, 0, 0, 0, 0, 0, 0, 0 // 5
      ], [
        -0.6, -0.4, 0.5, 1.4, -1.4, 0, 0.8, 0, 0, 0, 0, 0, 0 // 6
      ], [
        -0.1, -0.3, -0.1, 0.7, 0.2, -0.5, -0.8, 1, 0, 0, 0, 0, 0 // 7
      ], [
        -0.1, 0.1, -0.1, 0.5, -0.1, 0.4, 0.5, 0, 0.4, 0, 0, 0, 0 // 8
      ], [
        -0.1, -0.2, -0, 0.4, -0.3, 0, 0.3, -0, 0, -0.4, 0, 0, 0 // 9
      ], [
        0, -0, -0, 0.2, -0.1, -0.2, -0, -0.1, -0.2, -0.1, -0, 0, 0 // 10
      ], [
        0, -0.1, 0, 0, 0, -0.1, 0, 0, -0.1, -0.1, -0.1, -0.1, 0 // 11
      ], [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.1 //12
      ]
    ];
    this.htnm_wmm2020 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 0
      ], [
        0, -25.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 1
      ], [
        0, -30.2, -23.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 2
      ], [
        0, 5.7, -1.0, 1.1, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 3
      ], [
        0, 0.2, 6.9, 3.7, -5.6, 0, 0, 0, 0, 0, 0, 0, 0 // 4
      ], [
        0, 0.1, 2.5, -0.9, 3.0, 0.5, 0, 0, 0, 0, 0, 0, 0 // 5
      ], [
        0, 0.1, -1.8, -1.4, 0.9, 0.1, 1.0, 0, 0, 0, 0, 0, 0 // 6
      ], [
        0, 0.5, 0.6, -0.7, -0.2, -1.2, 0.2, 0.3, 0, 0, 0, 0, 0 // 7
      ], [
        0, -0.3, 0.7, -0.2, 0.5, -0.3, -0.5, 0.4, 0.1, 0, 0, 0, 0 // 8
      ], [
        0, -0.3, 0.2, -0.4, 0.4, 0.1, -0, -0.2, 0.5, 0.2, 0, 0, 0 // 9
      ], [
        0, -0, 0.1, -0.3, 0.1, -0.2, 0.1, -0, -0.1, 0.2, -0, 0, 0 // 10
      ], [
        0, -0, 0.1, 0, 0.2, -0, 0, 0.1, -0, -0.1, 0, -0, 0 // 11
      ], [
        0, -0, 0, -0.1, 0.1, -0, 0, -0, 0.1, -0, -0, 0, -0.1 // 12
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

    yearfrac = (julian_days - this.julian_days_2020) / 365.25;
    for (n = 1; n <= this.nmax; n++) {
      for (m = 0; m <= this.nmax; m++) {
        this.gnm[n][m] = this.gnm_wmm2020[n][m] + yearfrac * this.gtnm_wmm2020[n][m];
        this.hnm[n][m] = this.hnm_wmm2020[n][m] + yearfrac * this.htnm_wmm2020[n][m];
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
   * yymm_to_julian_days
   * Converts a given year, month and day to a Julian day using epoch 1950-2049.
   * @param {number} yy: requested year.
   * @param {number} mm: requested month of the year.
   * @param {number} dd: requested day of the month.
   * @returns {number} the julian date referenced to the epoch
   */
  yymmdd_to_julian_days(yy, mm, dd) {
    return new Date(yy, mm, dd).getJulian();
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
