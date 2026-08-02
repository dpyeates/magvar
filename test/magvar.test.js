const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
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
const {
  officialTestValues,
  OFFICIAL_TEST_VALUES_PATH,
  parseWmmTestValues
} = require('./parseWmmTestValues');
const { testData: extendedTestVectors } = require('./wmm2025-test-values');

describe('Official WMM2025_TEST_VALUES.txt', () => {
  test('fixture is present and parses to 12 validation cases', () => {
    expect(fs.existsSync(OFFICIAL_TEST_VALUES_PATH)).toBe(true);
    expect(officialTestValues).toHaveLength(12);
    expect(parseWmmTestValues(OFFICIAL_TEST_VALUES_PATH)).toHaveLength(12);
  });

  test.each(officialTestValues.map((row) => [row.label, row]))(
    'main field components match published values: %s',
    (_label, row) => {
      const field = calculateMagneticField(
        row.decimalYear,
        row.latitude,
        row.longitude,
        row.heightKm
      );

      // Official document publishes intensities to 0.1 nT and angles to 0.01°.
      expect(field.x).toBe(row.x);
      expect(field.y).toBe(row.y);
      expect(field.z).toBe(row.z);
      expect(field.h).toBe(row.h);
      expect(field.f).toBe(row.f);
      expect(field.inclination).toBe(row.inclination);
      expect(field.declination).toBe(row.declination);
      expect(field.decimalYear).toBe(row.decimalYear);
    }
  );

  test.each(officialTestValues.map((row) => [row.label, row]))(
    'magvar / magneticField / decimal-year helpers agree: %s',
    (_label, row) => {
      const viaMagvar = magvar(
        row.latitude,
        row.longitude,
        row.heightKm,
        row.decimalYear
      );
      const viaHelper = calculateMagVarForDecimalYear(
        row.decimalYear,
        row.latitude,
        row.longitude,
        row.heightKm
      );
      const viaField = magneticField(
        row.latitude,
        row.longitude,
        row.heightKm,
        row.decimalYear
      );

      expect(viaMagvar).toBe(row.declination);
      expect(viaHelper).toBe(row.declination);
      expect(viaField.declination).toBe(row.declination);
      expect(viaField.inclination).toBe(row.inclination);
      expect(viaField.x).toBe(row.x);
      expect(viaField.y).toBe(row.y);
      expect(viaField.z).toBe(row.z);
      expect(viaField.h).toBe(row.h);
      expect(viaField.f).toBe(row.f);
    }
  );

  test.each(officialTestValues.map((row) => [row.label, row]))(
    'derived identities hold for published geometry: %s',
    (_label, row) => {
      const field = calculateMagneticField(
        row.decimalYear,
        row.latitude,
        row.longitude,
        row.heightKm
      );

      // Intensities/angles are rounded in both the library and the document, so
      // recomputing from rounded components can differ slightly from published values.
      expect(Math.abs(field.h - Math.hypot(field.x, field.y))).toBeLessThan(0.15);
      expect(Math.abs(field.f - Math.hypot(field.h, field.z))).toBeLessThan(0.15);
      expect(
        Math.abs(
          field.declination - (Math.atan2(field.y, field.x) * 180) / Math.PI
        )
      ).toBeLessThan(0.02);
      expect(
        Math.abs(
          field.inclination - (Math.atan2(field.z, field.h) * 180) / Math.PI
        )
      ).toBeLessThan(0.02);
    }
  );

  test('handles longitudes outside [-180, 180] as in the official file (240°)', () => {
    const east = officialTestValues.find(
      (row) => row.longitude === 240 && row.decimalYear === 2025.0 && row.heightKm === 0
    );
    const wrapped = calculateMagneticField(2025.0, -80.0, 240.0 - 360.0, 0);
    expect(east).toBeDefined();
    expect(wrapped.declination).toBe(east.declination);
    expect(wrapped.x).toBe(east.x);
    expect(wrapped.y).toBe(east.y);
    expect(wrapped.z).toBe(east.z);
  });

  test('secular change between 2025.0 and 2027.5 matches published rates', () => {
    const early = officialTestValues.filter((row) => row.decimalYear === 2025.0);
    const late = officialTestValues.filter((row) => row.decimalYear === 2027.5);
    expect(early).toHaveLength(6);
    expect(late).toHaveLength(6);

    early.forEach((start) => {
      const end = late.find(
        (row) =>
          row.latitude === start.latitude &&
          row.longitude === start.longitude &&
          row.heightKm === start.heightKm
      );
      expect(end).toBeDefined();

      const dt = end.decimalYear - start.decimalYear;
      const startField = calculateMagneticField(
        start.decimalYear,
        start.latitude,
        start.longitude,
        start.heightKm
      );
      const endField = calculateMagneticField(
        end.decimalYear,
        end.latitude,
        end.longitude,
        end.heightKm
      );

      // Average rates over 2.5 years vs instantaneous published rates at 2025.0.
      // Hdot/Fdot are nonlinear combinations, so they need a wider band.
      const avg = (a, b) => (b - a) / dt;
      expect(avg(startField.declination, endField.declination)).toBeCloseTo(
        start.dDot,
        1
      );
      expect(avg(startField.inclination, endField.inclination)).toBeCloseTo(
        start.iDot,
        1
      );
      expect(avg(startField.x, endField.x)).toBeCloseTo(start.xDot, 0);
      expect(avg(startField.y, endField.y)).toBeCloseTo(start.yDot, 0);
      expect(avg(startField.z, endField.z)).toBeCloseTo(start.zDot, 0);
      expect(Math.abs(avg(startField.h, endField.h) - start.hDot)).toBeLessThan(1.5);
      expect(Math.abs(avg(startField.f, endField.f) - start.fDot)).toBeLessThan(1.5);
    });
  });

  test('covers sea level and 100 km for polar, equatorial, and southern sites', () => {
    const keys = new Set(
      officialTestValues.map(
        (row) => `${row.latitude},${row.longitude},${row.heightKm}`
      )
    );
    expect(keys).toEqual(
      new Set([
        '80,0,0',
        '0,120,0',
        '-80,240,0',
        '80,0,100',
        '0,120,100',
        '-80,240,100'
      ])
    );
  });
});

describe('Extended WMM regression vectors', () => {
  test('includes many sites across the model validity window', () => {
    expect(extendedTestVectors.length).toBeGreaterThanOrEqual(90);
    const years = new Set(extendedTestVectors.map((row) => row[0]));
    expect(years.has(2025.0)).toBe(true);
    expect(years.has(2029.5)).toBe(true);
  });

  test.each(
    extendedTestVectors.map((row, index) => [
      `#${index + 1} ${row[0]} lat=${row[2]} lon=${row[3]} h=${row[1]}`,
      row
    ])
  )('declination and field components: %s', (_label, row) => {
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

describe('Public API behavior', () => {
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
    expect(magvar(lat, lon, 0, date)).toBe(
      magvar(lat, lon, 0, dateToDecimalYear(date))
    );
    expect(magneticField(lat, lon, 0, 2026.5).declination).toBe(
      calculateMagVarForDecimalYear(2026.5, lat, lon, 0)
    );
  });

  test('calculateMagVar julian-day path stays consistent with decimal years', () => {
    const decimalYear = 2027.0;
    const julianDays =
      require('../src/WMMCOF2025').julianDaysCOF +
      (decimalYear - MODEL_EPOCH) * 365.25;
    expect(calculateMagVar(julianDays, 10, 20, 5)).toBe(
      calculateMagVarForDecimalYear(decimalYear, 10, 20, 5)
    );
  });

  test('warns once when outside model validity period', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.resetModules();
    const fresh = require('../src/magvar');
    fresh.calculateMagVarForDecimalYear(MODEL_VALID_UNTIL + 0.1, 0, 0, 0);
    fresh.calculateMagVarForDecimalYear(MODEL_EPOCH - 1, 0, 0, 0);
    expect(warn).toHaveBeenCalled();
    expect(warn.mock.calls[0][0]).toMatch(/outside the WMM/);
    warn.mockRestore();
  });

  test('handles polar latitudes', () => {
    expect(Number.isFinite(magvar(90, 0, 0, MODEL_EPOCH))).toBe(true);
    expect(Number.isFinite(magvar(-90, 0, 0, MODEL_EPOCH))).toBe(true);
  });

  test('rejects invalid when argument', () => {
    expect(() => magvar(0, 0, 0, 'tomorrow')).toThrow(TypeError);
  });
});

describe('Date utilities', () => {
  test('gregorianToJulian is timezone-independent (UTC)', () => {
    expect(gregorianToJulian(2025, 0, 1)).toBe(2460676.5);
    expect(resolveDecimalYear(new Date(Date.UTC(2025, 0, 1)))).toBe(2025);

    for (const tz of ['UTC', 'America/Los_Angeles', 'Asia/Tokyo']) {
      const result = spawnSync(
        process.execPath,
        [
          '-e',
          `const { gregorianToJulian } = require('./src/utils'); process.stdout.write(String(gregorianToJulian(2025, 0, 1)));`
        ],
        {
          cwd: path.join(__dirname, '..'),
          env: { ...process.env, TZ: tz }
        }
      );
      expect(result.status).toBe(0);
      expect(result.stdout.toString()).toBe('2460676.5');
    }
  });

  test('dateToDecimalYear maps mid-year UTC dates near *.5', () => {
    expect(dateToDecimalYear(new Date(Date.UTC(2025, 0, 1)))).toBe(2025);
    expect(dateToDecimalYear(new Date(Date.UTC(2025, 6, 2, 12)))).toBeCloseTo(
      2025.5,
      2
    );
  });
});
