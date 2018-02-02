// @flow
'use strict';

class MagVar {
  
  static Get(lat, lon) {
    let mv = new MagVar();
    return mv.GetMagVar(lat, lon, 0);
  }
  
  constructor() {
    this.nmax = 12;
    this.a = 6378.137; /* semi-major axis [equatorial radius] of WGS84 ellipsoid */
    this.f = 1.0 / 298.257223563; /* inverse flattening IAU66 ellipsoid */
    this.b = 6356.7523142; /* semi-minor axis referenced to the WGS84 ellipsoid */
    this.r_0 = 6371.2; /* "mean radius" for spherical harmonic expansion */
    this.julian_days_2015 = 2457024;
    this.gnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      [
        -29438.5, -1501.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      [
        -2445.3, 3012.5, 1676.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      [
        1351.1, -2352.3, 1225.6, 581.9, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      [
        907.2, 813.7, 120.3, -335.0, 70.3, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      [
        -232.6, 360.1, 192.4, -141.0, -157.4, 4.3, 0, 0, 0, 0, 0, 0, 0
      ],
      [
        69.5, 67.4, 72.8, -129.8, -29.0, 13.2, -70.9, 0, 0, 0, 0, 0, 0
      ],
      [
        81.6, -76.1, -6.8, 51.9, 15.0, 9.3, -2.8, 6.7, 0, 0, 0, 0, 0
      ],
      [
        24.0, 8.6, -16.9, -3.2, -20.6, 13.3, 11.7, -16.0, -2.0, 0, 0, 0, 0
      ],
      [
        5.4, 8.8, 3.1, -3.1, 0.6, -13.3, -0.1, 8.7, -9.1, -10.5, 0, 0, 0
      ],
      [
        -1.9, -6.5, 0.2, 0.6, -0.6, 1.7, -0.7, 2.1, 2.3, -1.8, -3.6, 0, 0
      ],
      [
        3.1, -1.5, -2.3, 2.1, -0.9, 0.6, -0.7, 0.2, 1.7, -0.2, 0.4, 3.5, 0
      ],
      [
        -2.0, -0.3, 0.4, 1.3, -0.9, 0.9, 0.1, 0.5, -0.4, -0.4, 0.2, -0.9, 0
      ]
    ];
    this.hnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0, 4796.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0, -2845.6, -642.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0, -115.3, 245.0, -538.3, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0, 283.4, -188.6, 180.9, -329.5, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0, 47.4, 196.9, -119.4, 16.1, 100.1, 0, 0, 0, 0, 0, 0, 0
      ], [
        0, -20.7, 33.2, 58.8, -66.5, 7.3, 62.5, 0, 0, 0, 0, 0, 0
      ], [
        0, -54.1, -19.4, 5.6, 24.4, 3.3, -27.5, -2.3, 0, 0, 0, 0, 0
      ], [
        0, 10.2, -18.1, 13.2, -14.6, 16.2, 5.7, -9.1, 2.2, 0, 0, 0, 0
      ], [
        0, -21.6, 10.8, 11.7, -6.8, -6.9, 7.8, 1.0, -3.9, 8.5, 0, 0, 0
      ], [
        0, 3.3, -0.3, 4.6, 4.4, -7.9, -0.6, -4.1, -2.8, -1.1, -8.7, 0, 0
      ], [
        0, -0.1, 2.1, -0.7, -1.1, 0.7, -0.2, -2.1, -1.5, -2.5, -2.0, -2.3, 0
      ], [
        0, -1.0, 0.5, 1.8, -2.2, 0.3, 0.7, -0.1, 0.3, 0.2, -0.9, -0.2, 0.7
      ]
    ];
    this.gtnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        10.7, 17.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        -8.6, -3.3, 2.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        3.1, -6.2, -0.4, -10.4, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        -0.4, 0.8, -9.2, 4.0, -4.2, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        -0.2, 0.1, -1.4, 0, 1.3, 3.8, 0, 0, 0, 0, 0, 0, 0
      ], [
        -0.5, -0.2, -0.6, 2.4, -1.1, 0.3, 1.5, 0, 0, 0, 0, 0, 0
      ], [
        0.2, -0.2, -0.4, 1.3, 0.2, -0.4, -0.9, 0.3, 0, 0, 0, 0, 0
      ], [
        0, 0.1, -0.5, 0.5, -0.2, 0.4, 0.2, -0.4, 0.3, 0, 0, 0, 0
      ], [
        0, -0.1, -0.1, 0.4, -0.5, -0.2, 0.1, 0, -0.2, -0.1, 0, 0, 0
      ], [
        0, 0, -0.1, 0.3, -0.1, -0.1, -0.1, 0, -0.2, -0.1, -0.2, 0, 0
      ], [
        0, 0, -0.1, 0.1, 0, 0, 0, 0, 0, 0, -0.1, -0.1, 0
      ], [
        0.1, 0, 0, 0.1, -0.1, 0, 0.1, 0, 0, 0, 0, 0, 0
      ]
    ];
    this.htnm_wmm2015 = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0.0, -26.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0.0, -27.1, -13.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0.0, 8.4, -0.4, 2.3, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0.0, -0.6, 5.3, 3.0, -5.3, 0, 0, 0, 0, 0, 0, 0, 0
      ], [
        0.0, 0.4, 1.6, -1.1, 3.3, 0.1, 0, 0, 0, 0, 0, 0, 0
      ], [
        0.0, 0.0, -2.2, -0.7, 0.1, 1.0, 1.3, 0, 0, 0, 0, 0, 0
      ], [
        0.0, 0.7, 0.5, -0.2, -0.1, -0.7, 0.1, 0.1, 0, 0, 0, 0, 0
      ], [
        0.0, -0.3, 0.3, 0.3, 0.6, -0.1, -0.2, 0.3, 0.0, 0, 0, 0, 0
      ], [
        0.0, -0.2, -0.1, -0.2, 0.1, 0.1, 0.0, -0.2, 0.4, 0.3, 0, 0, 0
      ], [
        0.0, 0.1, -0.1, 0.0, 0.0, -0.2, 0.1, -0.1, -0.2, 0.1, -0.1, 0, 0
      ], [
        0.0, 0.0, 0.1, 0.0, 0.1, 0.0, 0.0, 0.1, 0.0, -0.1, 0.0, -0.1, 0
      ], [
        0.0, 0.0, 0.0, -0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    ];
    this.P = this.createArray(13, 13); //new double[13][13];
    this.DP = this.createArray(13, 13); //new double[13][13];
    this.gnm = this.createArray(13, 13); //new double[13][13];
    this.hnm = this.createArray(13, 13); //new double[13][13];
    this.sm = this.createArray(13); //new double[13];
    this.cm = this.createArray(13); //new double[13];
    this.root = this.createArray(13); //new double[13];
    this.roots = this.createArray(13, 13, 2); //new double[13][13][2];
    for (var n = 2; n <= this.nmax; n++) {
      this.root[n] = Math.sqrt((2.0 * n - 1) / (2.0 * n));
    }
    for (var m = 0; m <= this.nmax; m++) {
      var mm = m * m;
      for (n = Math.max(m + 1, 2); n <= this.nmax; n++) {
        this.roots[m][n][0] = Math.sqrt((n - 1) * (n - 1) - mm);
        this.roots[m][n][1] = 1.0 / Math.sqrt(n * n - mm);
      }
    }
  }

  createArray(length) {
    var arr = new Array(length || 0),
      i = length;
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while (i--) arr[length - 1 - i] = this.createArray.apply(this, args);
    }
    return arr;
  };

  /* Convert date to Julian day 1950-2049 */
  yymmdd_to_julian_days(yy, mm, dd) {
    var jd;
    yy = (yy < 50) ? (2000 + yy) : (1900 + yy);
    jd = dd - 32075 + 1461 * (yy + 4800 + (mm - 14) / 12) / 4;
    jd = jd + 367 * (mm - 2 - (mm - 14) / 12 * 12) / 12;
    jd = jd - 3 * ((yy + 4900 + (mm - 14) / 12) / 100) / 4;
    return (Math.floor(jd));
  };

  toDegrees(rad) {
    return rad * (180 / Math.PI);
  };

  toRadians(deg) {
    return deg * (Math.PI / 180);
  };

  /* Round to a specified number of decimal places */
  RoundToDecimalPlace(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };

  /* Given a latitude, longitude and height in metres, return magnetic variation (in degrees) */
  GetMagVar(lat, lon, h) {
    var dt = new Date();
    var julian_days_now = this.yymmdd_to_julian_days(dt.getFullYear() - 2000, dt.getMonth(), dt.getDate());
    return this.CalculateMagVar(julian_days_now, lat, lon, h);
  };

  /*
   * Given a date in julian days, latitude, longitude and height, return variation (in degrees)
   * N and E lat and long are positive, S and W negative
   */
  CalculateMagVar(julian_days, latIn, lonIn, h) {

    /* output field B_r,B_th,B_phi,B_x,B_y,B_z */
    var n, m;
    var lat = this.toRadians(latIn);
    var lon = this.toRadians(lonIn);
    var sinlat = Math.sin(lat);
    var coslat = Math.cos(lat);
    var yearfrac, sr, r, theta, c, s, psi, fn, fn_0, B_r, B_theta, B_phi, X, Y, Z;
    var sinpsi, cospsi, inv_s;
    var mm = 0.0;

    /* convert to geocentric */
    /* sr is effective radius */
    sr = Math.sqrt(this.a * this.a * coslat * coslat + this.b * this.b * sinlat * sinlat);

    /* theta is geocentric co-latitude */
    theta = Math.atan2(coslat * (h * sr + this.a * this.a), sinlat * (h * sr + this.b * this.b));

    /* r is geocentric radial distance */
    r = h * h + 2.0 * h * sr +
      (this.a * this.a * this.a * this.a - (this.a * this.a * this.a * this.a - this.b * this.b * this.b * this.b) * sinlat * sinlat) /
      (this.a * this.a - (this.a * this.a - this.b * this.b) * sinlat * sinlat);
    r = Math.sqrt(r);
    c = Math.cos(theta);
    s = Math.sin(theta);

    /* protect against zero divide at geographic poles */
    inv_s = 1.0 / (s + ((s === 0.0) ? 1.0e-8 : 0));

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
        this.P[n][m] = (this.P[n - 1][m] * c * (2.0 * n - 1) -
          this.P[n - 2][m] * this.roots[m][n][0]) * this.roots[m][n][1];
        this.DP[n][m] = ((this.DP[n - 1][m] * c - this.P[n - 1][m] * s) *
          (2.0 * n - 1) - this.DP[n - 2][m] * this.roots[m][n][0]) * this.roots[m][n][1];
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

    var c1_n = 0.0;
    var c2_n = 0.0;
    var c3_n = 0.0;
    var tmp = 0.0;
    for (n = 1; n <= this.nmax; n++) {
      c1_n = 0;
      c2_n = 0;
      c3_n = 0;
      for (m = 0; m <= n; m++) {
        tmp = (this.gnm[n][m] * this.cm[m] + this.hnm[n][m] * this.sm[m]);
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
    psi = theta - ((Math.PI / 2.0) - lat);
    sinpsi = Math.sin(psi);
    cospsi = Math.cos(psi);
    X = -B_theta * cospsi - B_r * sinpsi;
    Y = B_phi;
    Z = B_theta * sinpsi - B_r * cospsi;
    /* find variation in radians */
    /* return zero variation at magnetic pole X=Y=0. */
    /* E is positive */
    return (X !== 0.0 || Y !== 0.0) ? this.RoundToDecimalPlace(this.toDegrees(Math.atan2(Y, X)), 2) : 0.0;
  };
}

module.exports = MagVar;
module.exports.default = MagVar;
