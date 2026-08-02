const {
  gregorianToJulian,
  dateToDecimalYear,
  resolveDecimalYear
} = require('../src/utils');
const {
  magvar,
  magneticField,
  calculateMagVar,
  calculateMagVarForDecimalYear,
  calculateMagneticField,
  MODEL_EPOCH,
  MODEL_VALID_UNTIL
} = require('../src/magvar');
const { testData } = require('./wmm2025-test-values');

describe('MagVar tests', () => {
  test('matches World Magnetic Model 2025-2030 declination test values', () => {
    testData.forEach((row) => {
      const [decimalYear, height, lat, lon, declination] = row;
      const result = calculateMagVarForDecimalYear(
        decimalYear,
        lat,
        lon,
        height
      );
      expect(result).toBeCloseTo(declination, 2);
    });
  });

  test('matches WMM 2025-2030 full field components', () => {
    testData.forEach((row) => {
      const [decimalYear, height, lat, lon, dec, inc, h, x, y, z, f] = row;
      const field = calculateMagneticField(decimalYear, lat, lon, height);
      expect(field.declination).toBeCloseTo(dec, 2);
      expect(field.inclination).toBeCloseTo(inc, 2);
      expect(field.h).toBeCloseTo(h, 0);
      expect(field.x).toBeCloseTo(x, 0);
      expect(field.y).toBeCloseTo(y, 0);
      expect(field.z).toBeCloseTo(z, 0);
      expect(field.f).toBeCloseTo(f, 0);
    });
  });

  test('magvar uses the current date rather than a module-load snapshot', () => {
    const lat = 51.2;
    const lon = -0.3;
    const expected = calculateMagVarForDecimalYear(
      dateToDecimalYear(new Date()),
      lat,
      lon,
      0
    );
    expect(magvar(lat, lon)).toBeCloseTo(expected, 2);
  });

  test('magvar accepts a Date and a decimal year', () => {
    const lat = 40.0;
    const lon = -75.0;
    const date = new Date(Date.UTC(2026, 6, 2));
    const fromDate = magvar(lat, lon, 0, date);
    const fromDecimal = magvar(lat, lon, 0, dateToDecimalYear(date));
    expect(fromDate).toBe(fromDecimal);
    expect(magneticField(lat, lon, 0, 2026.5).declination).toBe(
      calculateMagVarForDecimalYear(2026.5, lat, lon, 0)
    );
  });

  test('calculateMagVar julian-day path stays consistent with decimal years', () => {
    const decimalYear = 2027.0;
    const julianDays =
      require('../src/WMMCOF2025').julianDaysCOF +
      (decimalYear - MODEL_EPOCH) * 365.25;
    const lat = 10;
    const lon = 20;
    expect(calculateMagVar(julianDays, lat, lon, 5)).toBe(
      calculateMagVarForDecimalYear(decimalYear, lat, lon, 5)
    );
  });

  test('gregorianToJulian is timezone-independent (UTC)', () => {
    expect(gregorianToJulian(2025, 0, 1)).toBe(2460676.5);
    expect(resolveDecimalYear(new Date(Date.UTC(2025, 0, 1)))).toBe(2025);

    const { spawnSync } = require('child_process');
    for (const tz of ['UTC', 'America/Los_Angeles', 'Asia/Tokyo']) {
      const result = spawnSync(
        process.execPath,
        [
          '-e',
          `const { gregorianToJulian } = require('./src/utils'); process.stdout.write(String(gregorianToJulian(2025, 0, 1)));`
        ],
        { cwd: require('path').join(__dirname, '..'), env: { ...process.env, TZ: tz } }
      );
      expect(result.status).toBe(0);
      expect(result.stdout.toString()).toBe('2460676.5');
    }
  });

  test('warns once when outside model validity period', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    calculateMagVarForDecimalYear(MODEL_VALID_UNTIL + 0.1, 0, 0, 0);
    calculateMagVarForDecimalYear(MODEL_EPOCH - 1, 0, 0, 0);
    expect(warn).toHaveBeenCalled();
    expect(warn.mock.calls[0][0]).toMatch(/outside the WMM/);
    warn.mockRestore();
  });

  test('handles polar latitudes', () => {
    expect(Number.isFinite(magvar(90, 0, 0, MODEL_EPOCH))).toBe(true);
    expect(Number.isFinite(magvar(-90, 0, 0, MODEL_EPOCH))).toBe(true);
  });
});
