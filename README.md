# magvar
This package computes the estimated Magnetic Declination (Decl) (which is sometimes called Magnetic variation) at a specified location based upon the World Magnetic Model 2020-2025. More details can be found at: [https://www.ngdc.noaa.gov/geomag/WMM/DoDWMM.shtml](https://www.ngdc.noaa.gov/geomag/WMM/DoDWMM.shtml)

## Getting started

`$ npm install magvar --save`

or

`$ yarn add magvar`

## Usage

Input required is a spot location in geodetic (WGS84) latitude and longitude (positive for northern latitudes and eastern longitudes), geodetic altitude in meters, and the date of interest in years.

Altitude is optional and should be specified in kilometers above mean sea level - defaults to 0 if not given.

```javascript
import MagVar from 'magvar';

const magVar = MagVar.get([latitude], [longitude]);

 // or
 
const magVar = MagVar.get([latitude], [longitude], [height]);

```

Take a look at the test file for some examples.
  
## Test
After installing:
```javascript
npm run test
```
