# magvar
Calculates magnetic variation at a specified location based upon the World Magnetic Model 2015-2020v2. 
More details can be found at: https://www.ngdc.noaa.gov/geomag/WMM/DoDWMM.shtml

## Getting started

`$ npm install magvar --save`

## Usage

Latitudes and longitudes should be specified in degrees 
N and E are positive, S and W negative.
Height is optional and should be specified in metres above mean sea level - defaults to 0 if not given.

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