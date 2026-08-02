<img src="https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/inline-images/D.jpg" width="100%" alt="World Magnetic Model declination map">

# magvar

Compute **magnetic variation** (geomagnetic declination) and related World Magnetic Model field components in JavaScript.

`magvar` implements the [World Magnetic Model 2025–2030](https://www.ncei.noaa.gov/products/world-magnetic-model) (WMM2025), the standard model used for navigation, surveying, and compass correction. Given a geographic position (and optionally altitude and time), it returns how far magnetic north differs from true north at that point.

| | |
| --- | --- |
| Model | WMM2025 |
| Valid period | decimal years **2025.0 – 2030.0** |
| Coordinates | WGS84 geodetic latitude / longitude |
| Altitude | kilometres above mean sea level |
| Package | CommonJS (works with `require` and named ESM imports in modern Node) |

## Installation

```bash
npm install magvar
```

```bash
yarn add magvar
```

## Quick start

```javascript
const { magvar, magneticField } = require('magvar');
// or: import { magvar, magneticField } from 'magvar';

// Declination in degrees for London at sea level, current UTC time
const variation = magvar(51.5, -0.1);

// Positive => magnetic north is east of true north
// Negative => magnetic north is west of true north
console.log(variation);
```

## Inputs

All public helpers use the same position conventions:

| Argument | Meaning | Notes |
| --- | --- | --- |
| `latitude` | Geodetic latitude (degrees) | North positive, south negative. Range typically −90…90. |
| `longitude` | Geodetic longitude (degrees) | East positive, west negative. Values outside −180…180 (e.g. `240`) are accepted. |
| `altitude` | Height above mean sea level | **Kilometres**, not metres. Optional; defaults to `0`. Example: 100 m → `0.1`. |
| `when` | Evaluation time | Optional. A decimal year (`2027.5`) or a `Date`. If omitted, the **current UTC time** is used on each call. |

### Decimal years

WMM times are expressed as decimal years:

- `2025.0` → 2025-01-01
- `2027.5` → mid-2027
- A `Date` is converted using UTC

```javascript
magvar(51.5, -0.1, 0, 2027.0);
magvar(51.5, -0.1, 0, new Date('2027-06-01T00:00:00Z'));
```

### Model validity

WMM2025 is intended for **2025.0 ≤ year < 2030.0**.  
Requests outside that window still return a numeric result, but a one-time `console.warn` is emitted because accuracy is not guaranteed.

## API

### `magvar(latitude, longitude, altitude?, when?)`

Returns magnetic variation (declination) in degrees, rounded to 2 decimal places.

```javascript
const { magvar } = require('magvar');

magvar(40.7, -74.0);                 // now, sea level
magvar(40.7, -74.0, 0.3);            // 300 m altitude
magvar(40.7, -74.0, 0, 2026.5);      // mid-2026
magvar(-33.9, 151.2, 0, new Date()); // Sydney, current UTC time
```

### `magneticField(latitude, longitude, altitude?, when?)`

Returns the main field components at the same point in time:

```javascript
const { magneticField } = require('magvar');

const field = magneticField(80, 0, 0, 2025.0);
/*
{
  declination: 1.28,   // D, degrees (east positive)
  inclination: 83.21,  // I, degrees (down positive)
  x: 6521.6,           // north component, nT
  y: 145.9,            // east component, nT
  z: 54791.5,          // down component, nT
  h: 6523.2,           // horizontal intensity, nT
  f: 55178.5,          // total intensity, nT
  decimalYear: 2025
}
*/
```

| Field | Symbol | Unit | Description |
| --- | --- | --- | --- |
| `declination` | D | degrees | Angle from true north to magnetic north (east positive) |
| `inclination` | I | degrees | Angle of the field below the horizontal (down positive) |
| `x` | X | nT | Northward component |
| `y` | Y | nT | Eastward component |
| `z` | Z | nT | Downward component |
| `h` | H | nT | Horizontal intensity (`√(X² + Y²)`) |
| `f` | F | nT | Total intensity (`√(H² + Z²)`) |
| `decimalYear` | — | year | Decimal year used for the calculation |

Angles are rounded to 2 decimal places; intensities to 0.1 nT, matching the published WMM test-value precision.

### Explicit-time helpers

Use these when you already have a decimal year or Julian day and do not want “now” resolution:

```javascript
const {
  calculateMagVarForDecimalYear,
  calculateMagneticField,
  calculateMagVar, // Julian Day Number → declination (legacy)
  MODEL_EPOCH,       // 2025.0
  MODEL_VALID_UNTIL  // 2030.0
} = require('magvar');

calculateMagVarForDecimalYear(2025.0, 0, 120, 0); // -0.16
calculateMagneticField(2027.5, -80, 240, 100);
calculateMagVar(2460677, 80, 0, 0); // Julian day at model epoch (noon)
```

For new code, prefer `magvar`, `magneticField`, or `calculateMagVarForDecimalYear`.

### Date utilities

```javascript
const {
  dateToDecimalYear,
  gregorianToJulian,
  resolveDecimalYear
} = require('magvar/utils');

dateToDecimalYear(new Date('2025-07-02T12:00:00Z')); // ~2025.5
gregorianToJulian(2025, 0, 1); // 2460676.5 (00:00 UTC; month is 0-indexed)
resolveDecimalYear(2026.25);
resolveDecimalYear(new Date());
```

`gregorianToJulian` always uses UTC, so results do not depend on the process timezone.

## Examples

**Correct a magnetic heading to true heading**

```javascript
const { magvar } = require('magvar');

const magneticHeading = 90; // degrees
const variation = magvar(37.77, -122.42); // San Francisco
const trueHeading = magneticHeading + variation;
```

**Compare sea level vs aircraft altitude**

```javascript
const { magneticField } = require('magvar');

const surface = magneticField(0, 120, 0, 2025.0);
const flightLevel = magneticField(0, 120, 10, 2025.0); // 10 km
console.log(surface.declination, flightLevel.declination);
```

## Migrating

### From 2.0 to 2.1

- `julianDaysNow` is no longer exported. Pass a `Date` / decimal year into `magvar`, or use `dateToDecimalYear`.
- `magvar()` now uses the **current** UTC time on every call (it is not frozen at module load).
- The unused WMM 2020 coefficient file was removed from the published package.

### From 1.x to 2.x

- Import style and method name changed: use `{ magvar }` instead of the old `get` API.
- Coefficients were updated from WMM2020 to **WMM2025**.

## Development and tests

Clone the repo, install dependencies, and run the suite:

```bash
npm install
npm test
```

Tests use the official NOAA/NCEI [`WMM2025_TEST_VALUES.txt`](https://www.ncei.noaa.gov/sites/default/files/2025-02/WMM2025_TEST_VALUES.txt) document (vendored at `test/fixtures/WMM2025_TEST_VALUES.txt`) as the primary fixture, plus an extended regression set spanning 2025.0–2029.5.

## References

- [World Magnetic Model (NCEI)](https://www.ncei.noaa.gov/products/world-magnetic-model)
- [WMM2025 test values](https://www.ncei.noaa.gov/sites/default/files/2025-02/WMM2025_TEST_VALUES.txt)

## License

[MIT](LICENSE)
