<img src="https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/inline-images/D.jpg" width="100%" alt="React Native Gesture Handler by Software Mansion">

# magvar
This package computes the estimated Geomagnetic Declination (which is sometimes called Magnetic variation) at a specified location based upon the **World Magnetic Model 2025-2030**. More details about the World Magnetic Model can be found here: [https://www.ncei.noaa.gov/products/world-magnetic-model](https://www.ncei.noaa.gov/products/world-magnetic-model)

## BREAKING CHANGE IN VERSION 2.0
If you are upgrading from version 1, note that the way you import the module has changed, as well as the name of the method you call. The 'get' method in version 1 has now been renamed 'magvar'.

## Installation

`$ npm install magvar --save`

or

`$ yarn add magvar`

## Usage

Input required is a spot location in geodetic (WGS84) latitude and longitude (positive for northern latitudes and eastern longitudes), and altitude.

Altitude is optional and should be specified in **kilometers above mean sea level** - defaults to 0 if not given.

```javascript
import {magvar} from 'magvar';

const variation = magvar([latitude], [longitude]);

 // or

const variation = magvar([latitude], [longitude], [altitude]);

```

Take a look at the test file for some examples.
  
## Test
After installing:
```javascript
npm run test
```

## License

The magvar library is licensed under [The MIT License](LICENSE).
