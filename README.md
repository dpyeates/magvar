<img src="https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/inline-images/D.jpg" width="100%" alt="World Magnetic Model declination map">

# magvar
This package computes the estimated Geomagnetic Declination (magnetic variation) and related field components at a specified location using the **World Magnetic Model 2025-2030**. More details: [World Magnetic Model (NCEI)](https://www.ncei.noaa.gov/products/world-magnetic-model).

The model is valid for decimal years **2025.0 through 2030.0**. Calls outside that range still return a value, but a warning is emitted.

## Installation

```bash
npm install magvar --save
```

or

```bash
yarn add magvar
```

## Usage

Inputs are geodetic (WGS84) latitude and longitude in degrees (north/east positive, south/west negative), and optional altitude in **kilometers above mean sea level** (defaults to `0`).

An optional fourth argument selects the evaluation time: a **decimal year** (e.g. `2026.5`) or a `Date`. If omitted, the current UTC time is used.

```javascript
const { magvar, magneticField } = require('magvar');
// or: import { magvar, magneticField } from 'magvar';

const variation = magvar(51.5, -0.1);
const variationAtAltitude = magvar(51.5, -0.1, 0.1); // 100 m → 0.1 km
const variationIn2027 = magvar(51.5, -0.1, 0, 2027.0);
const variationOnDate = magvar(51.5, -0.1, 0, new Date('2027-06-01T00:00:00Z'));

const field = magneticField(51.5, -0.1, 0, 2025.0);
// field.declination, field.inclination (degrees)
// field.x, field.y, field.z, field.h, field.f (nT)
```

### Advanced / legacy helpers

```javascript
const {
  calculateMagVarForDecimalYear,
  calculateMagneticField,
  calculateMagVar, // Julian Day Number (legacy)
  MODEL_EPOCH,
  MODEL_VALID_UNTIL
} = require('magvar');

const { dateToDecimalYear, gregorianToJulian } = require('magvar/utils');
```

## Breaking changes in 2.1

- `julianDaysNow` is no longer exported. Pass a `Date` or decimal year to `magvar`, or use `dateToDecimalYear`.
- `magvar()` now evaluates against the **current** date on each call (not a value frozen at module load).
- Unused WMM 2020 coefficient file removed from the package.

## Test

Tests validate against the official NOAA/NCEI [`WMM2025_TEST_VALUES.txt`](https://www.ncei.noaa.gov/sites/default/files/2025-02/WMM2025_TEST_VALUES.txt) document (checked in under `test/fixtures/`), plus an extended regression set spanning 2025.0–2029.5.

```bash
npm install
npm test
```

## License

The magvar library is licensed under [The MIT License](LICENSE).
